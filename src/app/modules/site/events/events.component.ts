import { Component, OnInit } from '@angular/core';
import {IEventFilter} from '../../../core/interfaces/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public filter: IEventFilter;
  public ngOnInit() {
  }
}
