import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../core/services/events/events.service';
import { IEvent } from '../../../../core/interfaces/event';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  private id: string | null;
  public loading = false;
  // @ts-ignore
  public event: IEvent;
  url!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private _location: Location,
    private titleService: Title
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.get();
  }

  goBack() {
    this._location.back();
  }

  public get(): void {
    if (!this.id || this.loading) {
      return;
    }
    this.loading = true;
    this.eventsService
      .event(this.id)
      .subscribe((response) => {
        if (!response.success || !response.data?.length) {
          return;
        }
        this.event = response.data[0];
        this.titleService.setTitle(
          'PassTicket | Todos os eventos. Um só lugar. | ' + this.event?.titulo
        );
        this.url = `https://www.stay22.com/embed/gm?aid=5f845198216db60017f08372&address=${this.event.local}&checkin=${this.event.data}`;
      })
      .add(() => (this.loading = false));
  }
}
