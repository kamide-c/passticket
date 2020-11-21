import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SpiderService } from 'src/app/core/services/spider.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  stringToSeek: string;
  datesToSeek: string;
  events: any[];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _spiderService: SpiderService
  ) {}

  ngOnInit(): void {
    this.stringToSeek = this._route.snapshot.params.stringToSeek;

    this._route.queryParams.subscribe((params) => {
      if (!this.isEmpty(params))
        this.datesToSeek =
          moment(params['begin']).format('DD/MM/YYYY') +
          ' a ' +
          moment(params['end']).format('DD/MM/YYYY');
    });

    this._spiderService.getEvents().subscribe((res: any[]) => {
      if (res) {
        this.events = res;
        console.log(res);
      }
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  goToRouter(title) {
    this._router.navigate(['event', title]);
  }
}
