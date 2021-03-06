import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistComponent } from './modules/artist/artist.component';
import { SiteComponent } from './modules/site/site.component';
import { SiteModule } from './modules/site/site.module';
import { ArtistModule } from './modules/artist/artist.module';
import { ApiInterceptor } from './core/interceptors/api/api.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { SiteRoutingModule } from './modules/site/site-routing.module';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// services
import { CanonicalService } from './shared/services/canonical.service';
import { CookiesService } from './shared/services/cookies.service';

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [AppComponent, ArtistComponent, SiteComponent],
  imports: [
    SiteRoutingModule,
    SiteModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ArtistModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxJsonLdModule,
    /*ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),*/
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    CanonicalService,
    CookiesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
