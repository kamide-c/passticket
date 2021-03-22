import { Component, OnInit } from '@angular/core';
import { IEventFilter } from '../../../../core/interfaces/event';
import { Subscription } from 'rxjs';
import { ScrollPaginationService } from '../../../../core/services/scroll-pagination/scroll-pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public filter: any = {
    page_number: 1,
    page_size: 20,
  };
  public filterChange: any;
  public concatTerms!: string;
  constructor(
    private scrollPaginationService: ScrollPaginationService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    let urlFilter = this.activatedRoute.snapshot.queryParams.filter;
    if (urlFilter) {
      urlFilter = JSON.parse(urlFilter);
      this.filter = Object.assign(urlFilter, this.filter);
    }
  }

  ngOnInit(): void {
    this.concatTerms =
      (this.filter.search ? ' | ' + this.filter.search : '') +
      (this.filter.city ? ' | ' + this.filter.city : '') +
      (this.filter.date_begin
        ? ' | ' + moment(this.filter.date_begin).format('d/MMM')
        : '') +
      (this.filter.date_end
        ? ' | ' + moment(this.filter.date_end).format('d/MMM')
        : '');

    this.titleService.setTitle(
      'PassTicket | Todos os eventos. Um só lugar.' + this.concatTerms
    );
  }

  public doFilter(searchFilter: any): void {
    this.filterChange = searchFilter;
  }
}
