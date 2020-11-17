import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  busca: boolean;
  explorer: boolean;
  revenda: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.findMe();
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
