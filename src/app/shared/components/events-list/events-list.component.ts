import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent implements OnInit {
  @Input() events: any[];
  items: any;

  constructor() {}

  ngOnInit(): void {
    this.items = Array.from({ length: this.events.length }).map(
      (_, i) => this.events[i]
    );
  }
}
