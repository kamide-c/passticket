import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import * as moment from 'moment';
import { CanonicalService } from './shared/services/canonical.service';
import { CookiesService } from './shared/services/cookies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LgpdComponent } from './shared/components/lgpd/lgpd.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  date = new Date();
  constructor(
    private metaTagService: Meta,
    private _snackBar: MatSnackBar,
    private cookiesService: CookiesService
  ) {}

  ngOnInit() {
    this.metaTagService.addTags([
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
    ]);

    this.checkCookie();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(LgpdComponent);
  }

  checkCookie() {
    setTimeout(() => {
      if (!this.cookiesService.checkCookie()) this.openSnackBar();
    }, 2000);
  }
}
