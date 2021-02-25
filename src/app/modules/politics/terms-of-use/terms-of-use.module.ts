import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfUseComponent } from './page/terms-of-use.component';
import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';

@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [CommonModule, TermsOfUseRoutingModule],
})
export class TermsOfUseModule {}
