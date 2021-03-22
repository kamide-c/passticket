import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventsService } from '../../../../core/services/events/events.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLoadingProgressBar = false;
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private location: Location,
    public dialog: MatDialog,
    private _eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._eventsService.loadingSubject.subscribe((isLoading: any) => {
        this.showLoadingProgressBar = isLoading;
      })
    );
  }

  activeLink(path: any) {
    const location = this.location.path();

    return location.includes(path);
  }

  showLogo() {
    return this.location.path() !== '/';
  }

  openDialog() {
    this.dialog.open(HeaderResaleDialog);
  }
}

@Component({
  selector: 'header-resale-dialog',
  templateUrl: './header__resale.html',
})
export class HeaderResaleDialog {}
