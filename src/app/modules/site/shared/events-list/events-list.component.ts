import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from '../../../../core/services/events/events.service';
import {IEvent, IEventFilter} from '../../../../core/interfaces/event';
import {ScrollPaginationService} from '../../../../core/services/scroll-pagination/scroll-pagination.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  @Input()
  public filter: IEventFilter = {
    Paginacao: {
      page_size: 12,
      page_number: 1,
    }
  };
  @Input()
  private paginate: boolean;
  public loading = false;
  public events: Array<IEvent> = [];
  public scrollPaginationSubscription: Subscription;
  constructor(
    private eventsService: EventsService,
    private scrollPaginationService: ScrollPaginationService
  ) {
  }

  ngOnInit(): void {
    if (this.paginate || typeof this.paginate === 'undefined') {
      this.scrollPaginationSubscription = this.scrollPaginationService
        .listener()
        .subscribe(() => this.getEvents());
    }
    if (!this.filter) {
      this.filter = {
        Paginacao: {
          page_size: 12,
          page_number: 1,
        }
      };
    }
    this.getEvents();
  }

  @Input()
  public set changeFilter(filter: any) {
    if (!filter) {
      return;
    }
    this.events = [];
    this.filter.titulo = filter.search ? filter.search : null;
    this.filter.data_inicio = filter.date_begin ? filter.date_begin : new Date();
    this.filter.data_fim = filter.date_end ? filter.date_end : null;
    this.filter.cidade = filter.city ? filter.city : null;
    this.filter.estado = filter.state ? filter.state : null;
    this.filter.Paginacao.page_number = 1;
    this.getEvents();
  }

  private getEvents(): void {
    if (this.loading || !this.filter.Paginacao.page_number) {
      return;
    }
    this.loading = true;
    this.eventsService
      .events(this.filter)
      .subscribe(response => {
          if (!response.success) {
            // @todo Treat errors
            return;
          }
          this.filter.Paginacao.page_number = response.nextPage;
          this.events = this.events.concat(response.data);
      })
      .add(() => this.loading = false);
  }
}
