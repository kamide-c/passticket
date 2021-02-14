import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from '../../../core/services/events/events.service';
import { IEvent } from '../../../core/interfaces/event';
import { ScrollPaginationService } from '../../../core/services/scroll-pagination/scroll-pagination.service';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-event-carousel',
  templateUrl: './event-carousel.component.html',
  styleUrls: ['./event-carousel.component.scss'],
})
export class EventCarouselComponent implements OnInit {
  @Input()
  public filter: any;
  // @ts-ignore
  @Input() public paginate: boolean;
  private page = 1;
  public loading = false;
  public events: Array<IEvent> = [];
  // @ts-ignore
  public scrollPaginationSubscription: Subscription;

  customOptions: OwlOptions = {
    loop: false,
    margin: 10,
    items: 4,
    responsive: {
      0: {
        items: 1,
        loop: true,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  constructor(
    private eventsService: EventsService,
    private scrollPaginationService: ScrollPaginationService
  ) {}

  ngOnInit(): void {
    if (this.paginate || typeof this.paginate === 'undefined') {
      this.scrollPaginationSubscription = this.scrollPaginationService
        .listener()
        .subscribe(() => this.getEvents());
    }
    this.getEvents();
  }

  @Input()
  public set changeFilter(filter: any) {
    if (!filter) {
      return;
    }
    this.events = [];
    this.filter = filter;
    if (!this.filter.page_number) {
      this.filter.page_number = 1;
    }
    if (!this.filter.page_size) {
      this.filter.page_size = 20;
    }
    this.getEvents();
  }

  private getEvents(): void {
    if (this.loading || !this.filter.page_number) {
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
}
