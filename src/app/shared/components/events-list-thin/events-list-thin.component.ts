import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/core/interfaces/event';
import { EventsService } from 'src/app/core/services/events/events.service';
import { ScrollPaginationService } from 'src/app/core/services/scroll-pagination/scroll-pagination.service';

@Component({
  selector: 'app-events-list-thin',
  templateUrl: './events-list-thin.component.html',
  styleUrls: ['./events-list-thin.component.scss'],
})
export class EventsListThinComponent implements OnInit {
  public filter: any = {
    page_number: 1,
    page_size: 12,
  };
  // @ts-ignore
  public paginate: boolean;
  private page = 1;
  public loading = false;
  public events: Array<IEvent> = [];
  // @ts-ignore
  public scrollPaginationSubscription: Subscription;
  constructor(
    private eventsService: EventsService,
    private scrollPaginationService: ScrollPaginationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.paginate || typeof this.paginate === 'undefined') {
      this.scrollPaginationSubscription = this.scrollPaginationService
        .listener()
        .subscribe(() => this.getEvents());
    }
    this.getEvents();
    console.log('rola');
  }

  private getEvents(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.eventsService
      .events(this.filter)
      .subscribe((response) => {
        if (!response.success) {
          // @todo Treat errors
          return;
        }
        this.filter.page_number = response.nextPage;
        this.events = this.events.concat(response.data);
      })
      .add(() => (this.loading = false));
  }

  goToRouter(id: any) {
    this.router.navigate(['/', 'events', 'view', id]);
  }
}
