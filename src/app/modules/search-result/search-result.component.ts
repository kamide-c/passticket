import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  stringToSeek: string;
  datesToSeek: string;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.stringToSeek = this._route.snapshot.params.stringToSeek;

    this._route.queryParams.subscribe((params) => {
      if (!this.isEmpty(params))
        this.datesToSeek =
          moment(params['begin']).format('DD/MM/YYYY') +
          ' a ' +
          moment(params['end']).format('DD/MM/YYYY');
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}
