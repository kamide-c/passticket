import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: EventComponent }];

@NgModule({
  declarations: [EventComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class EventModule {}
