import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/shared/services/canonical.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: [],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      'Política de Privacidade | PassTicket | Todos os eventos. Um só lugar.'
    );

    this.metaTagService.addTags([
      {
        name: 'description',
        content:
          'Recomendamos que você leia a Política de Privacidade PassTicket por completo para garantir total informação e compreensão dos termos apresentados.',
      },
      {
        name: 'keywords',
        content:
          'Política de Privacidade | PassTicket | Todos os eventos. Um só lugar.',
      },
      { property: 'og:url', content: window.location.href },
      {
        property: 'og:title',
        content:
          'Política de Privacidade | PassTicket | Todos os eventos. Um só lugar.',
      },
      {
        property: 'og:description',
        content:
          'Recomendamos que você leia a Política de Privacidade PassTicket por completo para garantir total informação e compreensão dos termos apresentados.',
      },
    ]);

    this.canonicalService.setCanonicalURL();
  }
}
