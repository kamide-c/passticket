import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EventsListModule } from '../../../shared/components/events-list/events-list.module';
import { FlexModule } from '@angular/flex-layout';
import { SearchBarModule } from '../shared/search-bar/search-bar.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeModule } from '../../../core/pipes/safe.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  exports: [EventsComponent, ListComponent, ViewComponent],
  declarations: [EventsComponent, ListComponent, ViewComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    EventsListModule,
    FlexModule,
    SearchBarModule,
    MatProgressSpinnerModule,
    SafeModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
  ],
})
export class EventsModule {}
