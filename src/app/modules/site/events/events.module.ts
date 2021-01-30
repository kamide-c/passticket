import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsComponent} from './events.component';
import {EventsRoutingModule} from './events-routing.module';
import {ListComponent} from './list/list.component';
import {ViewComponent} from './view/view.component';

@NgModule({
  exports: [
    EventsComponent,
    ListComponent,
    ViewComponent,
  ],
  declarations: [
    EventsComponent,
    ListComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
  ]
})
export class EventsModule { }
