// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { RecommendedComponent } from './components/recommended/recommended.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

// pipes
import { SafePipe } from './pipes/safe.pipe';

// packages
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  SatDatepickerModule,
} from 'saturn-datepicker';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';

const modules = [
  MaterialModule,
  FlexLayoutModule,
  ScrollingModule,
  FormsModule,
  ReactiveFormsModule,
  SatDatepickerModule,
  RouterModule,
];
const components = [
  RecommendedComponent,
  EventsListComponent,
  SearchBarComponent,
];

@NgModule({
  declarations: [components, SafePipe],
  imports: [CommonModule, modules],
  exports: [modules, components, SafePipe],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class SharedModule {}
