// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

// Components
import { RecommendedComponent } from './components/recommended/recommended.component';
import { EventsListComponent } from './components/events-list/events-list.component';

// pipes
import { SafePipe } from './pipes/safe.pipe';

const modules = [
  MaterialModule,
  FlexLayoutModule,
  ScrollingModule,
  MatDividerModule,
  MatListModule,
];
const components = [RecommendedComponent, EventsListComponent];

@NgModule({
  declarations: [components, SafePipe],
  imports: [CommonModule, modules],
  exports: [modules, components, SafePipe],
})
export class SharedModule {}
