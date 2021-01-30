import { Component, OnInit } from '@angular/core';
import {IEventFilter} from '../../../core/interfaces/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public filter: IEventFilter;

  constructor() { }

  ngOnInit(): void {
  }

  public filtered(filter: IEventFilter): void {
    this.filter = filter;
  }
}
