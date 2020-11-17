import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: SearchResultComponent }];
@NgModule({
  declarations: [SearchResultComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class SearchResultModule {}
