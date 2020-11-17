import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { SpiderService } from './core/services/spider.service';
import { SearchResultComponent } from './modules/search-result/search-result.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchResultComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [SpiderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
