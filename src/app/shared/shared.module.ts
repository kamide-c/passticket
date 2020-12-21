// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

// Components
import { RecommendedComponent } from './components/recommended/recommended.component';
import { RecommendedSkeletonLoaderComponent } from './components/recommended/recommended-skeleton-loader/recommended-skeleton-loader.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsListSkeletonLoaderComponent } from './components/events-list/events-list-skeleton-loader/events-list-skeleton-loader.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SelectLocationDialog } from './components/search-bar/search-bar.component';

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
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const modules = [
  MaterialModule,
  FlexLayoutModule,
  ScrollingModule,
  FormsModule,
  ReactiveFormsModule,
  SatDatepickerModule,
  RouterModule,
  MatGoogleMapsAutocompleteModule,
  NgxSkeletonLoaderModule.forRoot(),
  Ng2SearchPipeModule,
];
const components = [
  RecommendedComponent,
  EventsListComponent,
  SearchBarComponent,
  SelectLocationDialog,
  RecommendedSkeletonLoaderComponent,
  EventsListSkeletonLoaderComponent,
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
