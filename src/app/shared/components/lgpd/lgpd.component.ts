import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-lgpd',
  templateUrl: './lgpd.component.html',
  styleUrls: ['./lgpd.component.scss'],
})
export class LgpdComponent implements OnInit {
  constructor(
    public snackBarRef: MatSnackBarRef<LgpdComponent>,
    private cookiesService: CookiesService
  ) {}

  ngOnInit(): void {}

  acceptCookies() {
    this.cookiesService.setCookie('User', 'userLGPD', 999);

    this.snackBarRef.dismiss();
  }
}
