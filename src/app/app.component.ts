import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SpiderService } from './core/services/spider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'passtick';

  constructor(
    private location: Location,
    private _spiderService: SpiderService
  ) {}

  ngOnInit(): void {}

  locations() {
    const location = this.location.path();

    return location.includes('searchResult') || location.includes('explore');
  }
}
