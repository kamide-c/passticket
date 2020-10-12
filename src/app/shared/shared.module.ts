import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Components
import { RecommendedComponent } from './components/recommended/recommended.component';

const modules = [MaterialModule, FlexLayoutModule, ScrollingModule];
const components = [RecommendedComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, modules],
  exports: [modules, components],
})
export class SharedModule {}
