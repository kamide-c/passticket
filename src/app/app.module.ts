import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [AppComponent, ArtistComponent, SiteComponent],
  imports: [
    SiteRoutingModule,
    SiteModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ArtistModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqD36CZLk6QJIHovC5N9qhp25YeltAPKQ',
      libraries: ['places'],
    }),
    /*ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),*/
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
