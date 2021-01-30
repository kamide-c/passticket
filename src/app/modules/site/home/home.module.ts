import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {EventsListModule} from '../shared/events-list/events-list.module';
import {SearchBarModule} from '../shared/search-bar/search-bar.module';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    EventsListModule,
    SearchBarModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
