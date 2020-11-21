import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {
    this.findMe();
  }

  activeLink(path) {
    const location = this.location.path();

    return location.includes(path);
  }

  showLogo() {
    return this.location.path() !== '/home';
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      // this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        console.log(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
