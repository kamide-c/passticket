import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';
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
  dates: any = { begin: null, end: null };
  place: string;
  filter = {
    buscageral: null,
    data_inicio: null,
    data_fim: null,
    cidade: null,
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _spiderService: SpiderService
  ) {
    _router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    this.stringToSeek = this._route.snapshot.params.stringToSeek;

    this._route.queryParams.subscribe((params) => {
      if (!this.isEmpty(params)) {
        this.datesToSeek =
          moment(params['begin']).format('DD/MM/YYYY') +
          ' a ' +
          moment(params['end']).format('DD/MM/YYYY');

        this.dates = {
          begin: params['begin'],
          end: params['end'],
        };

        this.place = params['location'];

        this.filter.buscageral = this.stringToSeek;
        this.filter.data_inicio = this.dates.begin;
        this.filter.data_fim = this.dates.end;
        this.filter.cidade = this.place;
      }
    });

    this._spiderService.getEvents(this.filter).subscribe((res: any) => {
      if (res) {
        this.events = res.data;
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
