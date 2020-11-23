import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private location: Location, public dialog: MatDialog) {}

  ngOnInit(): void {}

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
