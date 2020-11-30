import { Component, OnInit } from '@angular/core';
import { SpiderService } from '../../core/services/spider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recommended: any[];
  events: any[];

  constructor(private _spiderService: SpiderService) {}

  ngOnInit(): void {
    if (localStorage.getItem('EventsJson')) {
      const storagedEvents = JSON.parse(localStorage.getItem('EventsJson'));
      this.recommended = storagedEvents.slice(0, 10);
      this.events = storagedEvents.slice(10);
    } else {
      this._spiderService.getEvents().subscribe((res: any[]) => {
        console.log(res);
        if (res) {
          this.recommended = res.slice(0, 10);
          this.events = res.slice(10);
        }
      });
    }
  }
}
