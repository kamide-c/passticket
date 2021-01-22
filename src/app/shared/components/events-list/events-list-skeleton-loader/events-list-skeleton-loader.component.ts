import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list-skeleton-loader',
  templateUrl: './events-list-skeleton-loader.component.html',
  styleUrls: ['./events-list-skeleton-loader.component.scss'],
})
export class EventsListSkeletonLoaderComponent implements OnInit {
  @Input('repeat') repeatTimes: number;
  public repeat: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.repeatTimes; i++) {
      this.repeat.push('');
    }
  }
}
