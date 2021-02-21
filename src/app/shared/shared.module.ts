import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

// Modules
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventsListModule } from './components/events-list/events-list.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

// Components
import { EventCarouselComponent } from './components/event-carousel/event-carousel.component';
import { EventsListThinComponent } from './components/events-list-thin/events-list-thin.component';
import { EventsListThinSkeletonComponent } from './components/events-list-thin/events-list-thin-skeleton/events-list-thin-skeleton.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

// pipes
import { SafePipe } from './pipes/safe.pipe';

const modules = [
  MaterialModule,
  FlexLayoutModule,
  EventsListModule,
  CarouselModule,
  ScrollingModule,
  NgxSkeletonLoaderModule,
];

const components = [
  EventCarouselComponent,
  EventsListThinComponent,
  EventsListThinSkeletonComponent,
  ScrollToTopComponent,
];
@NgModule({
  declarations: [components, SafePipe],
  imports: [CommonModule, modules],
  exports: [modules, components, SafePipe],
})
export class SharedModule {}
