import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../core/services/events/events.service';
import { IEvent } from '../../../../core/interfaces/event';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/shared/services/canonical.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  private id: string | null;
  public loading = false;
  // @ts-ignore
  public event: IEvent;
  url!: string;
  path!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private _location: Location,
    private titleService: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.get();
    this.canonicalService.setCanonicalURL();
  }

  goBack() {
    this._location.back();
  }

  public get(): void {
    if (!this.id || this.loading) {
      return;
    }
    this.loading = true;
    this.eventsService
      .event(this.id)
      .subscribe((response) => {
        if (!response.success || !response.data?.length) {
          return;
        }
        this.event = response.data[0];

        const description = this.event.descricao ?? '';
        const keywords = this.event.titulo ?? '';
        const placename = this.event.cidade + ' - ' + this.event.uf ?? '';
        const region = this.event.uf + '-BR' ?? '';
        const title = this.event.titulo ?? '';

        this.metaTagService.addTags([
          {
            name: 'description',
            content: description?.slice(0, 150),
          },
          {
            name: 'keywords',
            content: keywords,
          },
          {
            name: 'geo.placename',
            content: placename,
          },
          {
            name: 'geo.region',
            content: region,
          },
          { property: 'og:url', content: window.location.href },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description?.slice(0, 150) },
        ]);

        this.titleService.setTitle(
          this.event?.titulo + ' | PassTicket | Todos os eventos. Um só lugar.'
        );
        this.url = `https://www.stay22.com/embed/gm?aid=5f845198216db60017f08372&address=${this.event.local}&checkin=${this.event.data}`;
      })
      .add(() => (this.loading = false));
  }
}
