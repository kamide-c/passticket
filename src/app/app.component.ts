import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  schema = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'Passticket',
    url: 'https://passticket.com.br'
  };

  date = new Date();
  constructor(
    private meta: Meta,
  ) {
    this.meta.addTags([
      {
        name: 'revisit-after',
        content: '7 days',
      },
      { name: 'rating', content: 'General' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Passticket' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'date',
        content: moment(this.date).format('YYYY-MM-DD'),
        scheme: 'YYYY-MM-DD',
      },
      { charset: 'UTF-8' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:site_name', content: 'PassTicket' },
      { property: 'og:region', content: 'Brasil' },
      { property: 'og:image', content: 'assets/images/logo.png' },
    ], true);
  }

  ngOnInit() {
  }
}
