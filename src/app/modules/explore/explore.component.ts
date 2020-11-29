import { AgmInfoWindow } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiderService } from 'src/app/core/services/spider.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  lat;
  lng;
  zoom = 13;
  events: Array<any>;
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;

  constructor(private _spiderService: SpiderService, private _router: Router) {
    this.currentIW = null;
    this.previousIW = null;
  }

  ngOnInit(): void {
    this.findMe();

    this._spiderService.getEvents().subscribe((res: any[]) => {
      if (res) {
        this.events = res;
      }
    });
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.lat = -23.5657261;
      this.lng = -46.6534232;
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

  eventDate(date) {
    return new Date(date);
  }

  goToRouter(id) {
    this._router.navigate(['event', id]);
  }

  mapClick(ev) {
    if (this.previousIW) {
      this.previousIW.close();
    }
  }

  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
  }
}
