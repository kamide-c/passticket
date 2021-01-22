import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { SpiderService } from 'src/app/core/services/spider.service';
import {
  EventsDataSource,
  EventsDataSourceConfig,
} from 'src/app/data/events.datasource';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent implements OnInit {
  @ViewChild('scrollViewport') scrollViewport: CdkVirtualScrollViewport;
  private _dataSources: EventsDataSource;

  constructor(
    private router: Router,
    private _spiderService: SpiderService,
    private ref: ChangeDetectorRef
  ) {}

  get dataSources() {
    return this._dataSources;
  }

  ngOnInit(): void {
    this._spiderService
      .getEvents(this._spiderService.filters)
      .pipe(
        map((res: any) => {
          if (this._dataSources) {
            this._dataSources.update(res, this._spiderService.filters);
          } else {
            const dataSourceConfig: EventsDataSourceConfig = {
              data: res.data,
              currentDataCount: res.currentDataCount,
              totalDataCount: res.totalDataCount,
              pageSize: 7,
              filters: this._spiderService.filters,
            };
            this._dataSources = new EventsDataSource(
              dataSourceConfig,
              this._spiderService
            );
          }

          return res;
        }),
        catchError((error) => {
          return throwError(error);
        }),
        share()
      )
      .subscribe(() => this.ref.detectChanges());
  }

  goToRouter(id) {
    this.router.navigate(['event', id]);
  }

  public trackByFn(index, element) {
    if (element) return element.id;

    return index;
  }
}
