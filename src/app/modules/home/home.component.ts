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
    this._spiderService.getEvents().subscribe((res: any[]) => {
      if (res) {
        this.recommended = res.slice(0, 10);
        this.events = res.slice(10);
      }
    });
  }
}
