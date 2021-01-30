import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsListComponent} from './events-list.component';
import {EventComponent} from './event/event.component';
import {RouterModule} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
    RouterModule,
    FlexModule,
    MatProgressSpinnerModule
  ]
})
export class EventsListModule { }
