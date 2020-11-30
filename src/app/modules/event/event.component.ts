import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpiderService } from '../../core/services/spider.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  evento: any;
  url: any;
  eventStart;
  constructor(
    private route: ActivatedRoute,
    private _spiderService: SpiderService,
    private _snackBar: MatSnackBar,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.params;

    this._spiderService.getEvent(data.id).subscribe((res) => {
      this.evento = res[0];
      this.eventStart = this.evento.data;
      this.url = `https://www.stay22.com/embed/gm?aid=5f845198216db60017f08372&address=${this.evento.local}&checkin=${this.eventStart}`;
    });
  }

  goToBuyTickets() {
    window.open(this.evento.link, '_blank');
  }

  /* To copy any Text */
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this._snackBar.open('Link copiado para a área de transfrência', '!', {
      duration: 2000,
    });
  }

  backClicked() {
    this._location.back();
  }
}
