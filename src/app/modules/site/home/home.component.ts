import { Component, OnInit } from '@angular/core';
import { IEventFilter } from '../../../core/interfaces/event';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/shared/services/canonical.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public filterSaoPaulo: any;
  public filterRioDeJaneiro: any;
  public filterCuritiba: any;

  constructor(
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {
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

  ngOnInit(): void {
    this.metaTagService.addTags([
      {
        name: 'description',
        content:
          'Todos os eventos estão na PassTicket! Shows, festas, teatros, Stand Ups, eventos corporativos, gastronômicos e muito mais. Garanta já seu ingresso!',
      },
      {
        name: 'keywords',
        content: 'PassTicket - Todos os Eventos em Um Só Lugar',
      },
      { property: 'og:url', content: window.location.href },
      {
        property: 'og:title',
        content: 'PassTicket - Todos os Eventos em Um Só Lugar',
      },
      {
        property: 'og:description',
        content:
          'Todos os eventos estão na PassTicket! Shows, festas, teatros, Stand Ups, eventos corporativos, gastronômicos e muito mais. Garanta já seu ingresso!',
      },
    ]);

    this.canonicalService.setCanonicalURL();
  }

  public filtered(filter: IEventFilter): void {}

  public seeMore(filter: any) {
    this.router.navigate(['events'], {
      queryParams: { filter: JSON.stringify(filter) },
      queryParamsHandling: 'merge',
    });
  }
}
