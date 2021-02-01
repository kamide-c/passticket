import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteRoutingModule} from './site-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {HomeModule} from './home/home.module';
import {EventsModule} from './events/events.module';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    HomeModule,
    EventsModule,
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    FlexModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class SiteModule { }