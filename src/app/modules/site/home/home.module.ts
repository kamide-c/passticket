import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {EventsListModule} from '../shared/events-list/events-list.module';
import {SearchBarModule} from '../shared/search-bar/search-bar.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    EventsListModule,
    SearchBarModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
