import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EventsService } from '../core/services/events/events.service';

export interface EventsDataSourceConfig {
  data: any;
  currentDataCount: number;
  totalDataCount: number;
  pageSize: number;
  filters: any;
}

export class EventsDataSource extends DataSource<any> {
  private _loading!: boolean;
  private _filters: any;
  private _currentDataCount: number;
  private _totalDataCount: number;
  private _length: number;
  private _pageSize: number;
  private _cachedData: Array<any>;
  private _fetchedPages = new Set<number>();
  private _dataStream: BehaviorSubject<any>;
  private _subscription = new Subscription();

  constructor(
    private _config: EventsDataSourceConfig,
    private eventsService: EventsService
  ) {
    super();

    this._filters = _config.filters;
    this._length = _config.totalDataCount;
    this._pageSize = _config.pageSize;
    this._currentDataCount = _config.data.length;
    this._totalDataCount = this._length;
    this._cachedData = Array.from<any>({ length: this._length });
    this._dataStream = new BehaviorSubject<(any | undefined)[]>(
      this._cachedData
    );

    if (this._config.data?.length) {
      this._fetchedPages.add(0);

      this._cachedData.splice(
        0,
        this._pageSize,
        ...Array.from({ length: this._config.data.length }).map(
          (_, i) => this._config.data[i]
        )
      );
      this._dataStream.next(this._cachedData);
    }
  }

  set loading(loading: boolean) {
    this._loading = loading;
  }

  get loading() {
    return this._loading;
  }

  set length(length: number) {
    this._length = length;
  }

  get length() {
    return this._length;
  }

  set cachedData(cachedData: Array<any>) {
    this._cachedData = cachedData;
  }

  get cachedData() {
    return this._cachedData;
  }

  set pageSize(size: number) {
    this._pageSize = size;
  }

  set currentDataCount(value: number) {
    this._currentDataCount = value;
  }

  get currentDataCount() {
    return this._currentDataCount;
  }

  set totalDataCount(value: number) {
    this._totalDataCount = value;
  }

  get totalDataCount() {
    return this._totalDataCount;
  }

  get dataStream() {
    return this._dataStream;
  }

  get fetchedPages() {
    return this._fetchedPages;
  }

  set filters(filters: any) {
    this._filters = filters;
  }

  get filters() {
    return this._filters;
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      })
    );

    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  public update(data: any, filters: any) {
    this._fetchedPages.clear();

    this._filters = filters;
    this._length = data.totalDataCount;
    this._totalDataCount = data.totalDataCount;
    this._currentDataCount = data.currentDataCount;
    this._cachedData = Array.from<any>({ length: data.totalDataCount });

    if (data?.data?.length) {
      this._fetchedPages.add(0);

      this._cachedData.splice(
        0,
        data.data.length,
        ...Array.from({ length: data.data.length }).map((_, i) => {
          return data.data[i];
        })
      );

      this._dataStream.next(this._cachedData);
      return;
    }

    this._cachedData = [];
    this._dataStream.next(this._cachedData);
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) return;

    this._fetchedPages.add(page);

    this._filters.page_number = page;

    this.loading = true;

    this.eventsService
      .events(this._filters)
      .pipe(
        retry(1),
        catchError(() => of())
      )
      .subscribe((res: any) => {
        this.loading = false;

        const data = res;

        if (data?.currentDataCount)
          this.currentDataCount = data.currentDataCount;

        this._cachedData.splice(
          this._cachedData.filter((v) => v !== undefined).length,

          data?.data?.length,

          ...Array.from({ length: data?.data?.length }).map((_, i) => {
            return data.data[i];
          })
        );
        this._dataStream.next(this._cachedData);
      });
  }
}
