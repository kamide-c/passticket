import { Component, OnInit } from '@angular/core';
import {IEventFilter} from "../../../../core/interfaces/event";
import {Subscription} from "rxjs";
import {ScrollPaginationService} from "../../../../core/services/scroll-pagination/scroll-pagination.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public filter: any = {
    page_number: 1,
    page_size: 20
  };
  public scrollPaginationSubscription: Subscription;
  public filterChange: any;
  constructor(
    private scrollPaginationService: ScrollPaginationService,
    private activatedRoute: ActivatedRoute
  ) {
    let urlFilter = this.activatedRoute.snapshot.queryParams.filter;
    if (urlFilter) {
      urlFilter = JSON.parse(urlFilter);
      this.filter = Object.assign(urlFilter, this.filter);
    }
  }

  ngOnInit(): void {
    //
  }

  public doFilter(searchFilter: any) {
    this.filterChange = searchFilter;
  }
}
