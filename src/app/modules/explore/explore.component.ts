import { AgmInfoWindow, AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
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
  stringToSeek: string;
  datesToSeek: string;
  place: string;
  dates: any = { begin: null, end: null };
  latSearch;
  lngSearch;
  currentLat;
  currentLong;

  constructor(
    private _spiderService: SpiderService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.currentIW = null;
    this.previousIW = null;
  }

  ngOnInit(): void {
    this.findMe();

    this.stringToSeek = this._route.snapshot.params.stringToSeek;

    this._route.queryParams.subscribe((params) => {
      if (!this.isEmpty(params)) {
        this.datesToSeek =
          moment(params['begin']).format('DD/MM/YYYY') +
          ' a ' +
          moment(params['end']).format('DD/MM/YYYY');

        this.dates = {
          begin: params['begin'],
          end: params['end'],
        };

        this.place = params['location'];

        this.latSearch = params['latitude'] ?? null;
        this.lngSearch = params['longitude'] ?? null;
      }
    });

    this._spiderService.getEvents().subscribe((res: any[]) => {
      if (res) {
        this.events = res;
      }
    });
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;

        this.lat = this.currentLat;
        this.lng = this.currentLong;
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.currentLat = -23.5657261;
      this.currentLong = -46.6534232;

      this.lat = this.currentLat;
      this.lng = this.currentLong;
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

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}
