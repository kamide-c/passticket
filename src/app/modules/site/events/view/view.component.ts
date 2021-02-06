import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '../../../../core/services/events/events.service';
import {IEvent} from "../../../../core/interfaces/event";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  private id: string | null;
  public loading = false;
  // @ts-ignore
  public event: IEvent;
  constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.get();
  }

  public get(): void {
    if (!this.id || this.loading) {
      return;
    }
    this.loading = true;
    this.eventsService.event(this.id)
      .subscribe(response => {
        if (!response.success || !response.data?.length) {
          return;
        }
        this.event = response.data[0];
      }).add(() => this.loading = false);
  }

}
