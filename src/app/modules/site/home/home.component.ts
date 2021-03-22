import { Component, OnInit } from '@angular/core';
import { IEventFilter } from '../../../core/interfaces/event';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public filterSaoPaulo: any;
  public filterRioDeJaneiro: any;
  public filterCuritiba: any;

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('PassTicket | Todos os eventos. Um só lugar.');

    this.filterSaoPaulo = {
      page_size: 4,
      page_number: 1,
      city: 'São Paulo',
    };
    this.filterRioDeJaneiro = {
      page_size: 4,
      page_number: 1,
      city: 'Rio de Janeiro',
    };
    this.filterCuritiba = {
      page_size: 4,
      page_number: 1,
      city: 'Curitiba',
    };
  }

  ngOnInit(): void {}

  public filtered(filter: IEventFilter): void {}

  public seeMore(filter: any) {
    this.router.navigate(['events'], {
      queryParams: { filter: JSON.stringify(filter) },
      queryParamsHandling: 'merge',
    });
  }
}
