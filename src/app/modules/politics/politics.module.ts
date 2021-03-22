import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliticsRoutingModule } from './politics-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const modules = [PoliticsRoutingModule, RouterModule, SharedModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
})
export class PoliticsModule {}
