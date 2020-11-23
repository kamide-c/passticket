import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { SpiderService } from './core/services/spider.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqD36CZLk6QJIHovC5N9qhp25YeltAPKQ',
      libraries: ['places'],
    }),
  ],
  providers: [SpiderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
