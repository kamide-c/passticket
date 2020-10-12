// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';

// Components
import { RecommendedComponent } from './components/recommended/recommended.component';
import { EventsListComponent } from './components/events-list/events-list.component';

const modules = [
  MaterialModule,
  FlexLayoutModule,
  ScrollingModule,
  MatDividerModule,
];
const components = [RecommendedComponent, EventsListComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, modules],
  exports: [modules, components],
})
export class SharedModule {}
