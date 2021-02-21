import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-thin-skeleton',
  templateUrl: './events-list-thin-skeleton.component.html',
  styleUrls: ['./events-list-thin-skeleton.component.scss'],
})
export class EventsListThinSkeletonComponent implements OnInit {
  @Input('repeat')
  repeatTimes!: number;
  public repeat: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.repeatTimes; i++) {
      this.repeat.push('');
    }
  }
}
