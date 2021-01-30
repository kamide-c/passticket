import { Component, OnInit } from '@angular/core';
import {IEventFilter} from '../../../core/interfaces/event';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public filterSaoPaulo: IEventFilter;
  public filterRioDeJaneiro: IEventFilter;
  public filterCuritiba: IEventFilter;

  constructor(private router: Router) {
    this.filterSaoPaulo = {
      Paginacao: {
        page_size: 4,
        page_number: 1
      },
      cidade: 'São Paulo',
    };
    this.filterRioDeJaneiro = {
      Paginacao: {
        page_size: 4,
        page_number: 1
      },
      cidade: 'Rio de Janeiro',
    };
    this.filterCuritiba = {
      Paginacao: {
        page_size: 4,
        page_number: 1
      },
      cidade: 'Curitiba',
    };

  }

  ngOnInit(): void {
  }

  public filtered(filter: IEventFilter): void {
    this.router.navigate(['events'], { queryParams: { filter: JSON.stringify(filter) } , queryParamsHandling: 'merge' });
  }
}
