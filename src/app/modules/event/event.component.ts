import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpiderService } from '../../core/services/spider.service';
import { map } from 'rxjs/operators';

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
    private _spiderService: SpiderService
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.params;

    this._spiderService
      .getEvents()
      .pipe(
        map((res) => {
          return res.filter((item) => {
            if (item.titulo === data.titulo) {
              this.evento = item;
              this.eventStart = this.evento.data;
              this.url = `https://www.stay22.com/embed/gm?aid=5f845198216db60017f08372&address=${this.evento.local}&checkin=${this.eventStart}`;
              return item;
            }
          });
        })
      )
      .subscribe();
  }

  goToBuyTickets() {
    window.open(this.evento.link, '_blank');
  }
}
