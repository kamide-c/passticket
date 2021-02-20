import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import {
  HeaderComponent,
  HeaderResaleDialog,
} from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './home/home.module';
import { EventsModule } from './events/events.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SidenavComponent } from '../../core/sidenav/sidenav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderResaleDialog,
    SidenavComponent,
  ],
  exports: [HeaderComponent, FooterComponent, SidenavComponent],
  imports: [
    HomeModule,
    EventsModule,
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    SharedModule,
  ],
})
export class SiteModule {}
