import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from '../../../../core/services/events/events.service';
import {IEvent, IEventFilter} from '../../../../core/interfaces/event';
import {ScrollPaginationService} from '../../../../core/services/scroll-pagination/scroll-pagination.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  public filter: IEventFilter = {
    Paginacao: {
      page_size: 9,
      page_number: 1,
    }
  };
  public loading = false;
  public events: Array<IEvent> = [];
  // public scrollPaginationSubscription: Subscription;
  constructor(private eventsService: EventsService, private scrollPaginationService: ScrollPaginationService) {
    /*this.scrollPaginationSubscription = this.scrollPaginationService.listener()
      .subscribe((result) => {
          console.log(result);
      });*/
  }

  @Input()
  public set changeFilter(filter: IEventFilter) {
    if (!filter) {
      return;
    }
    this.events = [];
    this.filter = filter;
    this.filter.Paginacao = {
      page_size: 3,
      page_number: 1,
    };
    this.getEvents();
  }

  ngOnInit(): void {
    this.getEvents();
  }

  private getEvents(): void {
    this.loading = true;
    this.eventsService
      .events(this.filter)
      .subscribe(response => {
          if (!response.success) {
            // @todo Treat
            return;
          }
          this.filter.Paginacao.page_number += 1;
          this.events = this.events.concat(response.data);
      })
      .add(() => this.loading = false);
  }
}
