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
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { EventsService } from 'src/app/core/services/events/events.service';
import {
  EventsDataSource,
  EventsDataSourceConfig,
} from 'src/app/data/events.datasource';

@Component({
  selector: 'app-events-list-thin',
  templateUrl: './events-list-thin.component.html',
  styleUrls: ['./events-list-thin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListThinComponent implements OnInit {
  @ViewChild('scrollViewport')
  scrollViewport!: CdkVirtualScrollViewport;
  private _dataSources!: EventsDataSource;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private ref: ChangeDetectorRef
  ) {}

  get dataSources() {
    return this._dataSources;
  }

  ngOnInit(): void {
    this.eventsService
      .events(this.eventsService.filters)
      .pipe(
        map((res: any) => {
          if (this._dataSources) {
            this._dataSources.update(res, this.eventsService.filters);
          } else {
            const dataSourceConfig: EventsDataSourceConfig = {
              data: res.data,
              currentDataCount: res.currentDataCount,
              totalDataCount: res.totalDataCount,
              pageSize: 11,
              filters: this.eventsService.filters,
            };
            this._dataSources = new EventsDataSource(
              dataSourceConfig,
              this.eventsService
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

  goToRouter(id: any) {
    this.router.navigate(['/', 'events', 'view', id]);
  }

  public trackByFn(index: any, element: any) {
    if (element) return element.id;

    return index;
  }
}
