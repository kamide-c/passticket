import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsListComponent} from './events-list.component';
import {EventComponent} from './event/event.component';
import {RouterModule} from "@angular/router";

@NgModule({
  exports: [
    EventsListComponent,
    EventComponent
  ],
  declarations: [
    EventsListComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class EventsListModule { }
