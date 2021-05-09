import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/shared/services/canonical.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: [],
})
export class TermsOfUseComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      'Termos de uso | PassTicket | Todos os eventos. Um só lugar.'
    );

    this.metaTagService.addTags([
      {
        name: 'description',
        content:
          'O presente Termos de Uso da PassTicket, uma divulgadora e agregadora de ingressos de eventos que oferece aos seus usuários acesso às informações.',
      },
      {
        name: 'keywords',
        content: 'Termos de uso | PassTicket | Todos os eventos. Um só lugar.',
      },
      { property: 'og:url', content: window.location.href },
      {
        property: 'og:title',
        content: 'Termos de uso | PassTicket | Todos os eventos. Um só lugar.',
      },
      {
        property: 'og:description',
        content:
          'O presente Termos de Uso da PassTicket, uma divulgadora e agregadora de ingressos de eventos que oferece aos seus usuários acesso às informações.',
      },
    ]);

    this.canonicalService.setCanonicalURL();
  }
}
