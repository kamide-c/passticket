import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SpiderService } from '../services/spider.service';

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
    private _spiderService: SpiderService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._spiderService.loadingSubject.subscribe((isLoading: boolean) => {
        console.log(isLoading);
        this.showLoadingProgressBar = isLoading;
      })
    );
  }

  activeLink(path) {
    const location = this.location.path();

    return location.includes(path);
  }

  showLogo() {
    return this.location.path() !== '/home';
  }

  openDialog() {
    this.dialog.open(HeaderResaleDialog);
  }
}

@Component({
  selector: 'header-resale-dialog',
  templateUrl: 'header__resale.html',
})
export class HeaderResaleDialog {}
