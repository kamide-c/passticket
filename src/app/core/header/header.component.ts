import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  activeLink(path) {
    const location = this.location.path();

    return location.includes(path);
  }

  showLogo() {
    return this.location.path() !== '/home';
  }
}
