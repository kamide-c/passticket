import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'passtick';

  constructor(private location: Location) {}

  locations() {
    const location = this.location.path();

    return location.includes('searchResult') || location.includes('explore');
  }
}
