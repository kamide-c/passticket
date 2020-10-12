import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpiderService } from 'src/app/core/services/spider.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  evento: any;
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
              return item;
            }
          });
        })
      )
      .subscribe();
  }
}
