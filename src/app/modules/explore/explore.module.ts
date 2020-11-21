import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [{ path: '', component: ExploreComponent }];
@NgModule({
  declarations: [ExploreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqD36CZLk6QJIHovC5N9qhp25YeltAPKQ',
    }),
  ],
  exports: [RouterModule],
})
export class ExploreModule {}
