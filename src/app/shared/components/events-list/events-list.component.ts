import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { SpiderService } from 'src/app/core/services/spider.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent implements OnInit {
  @Input() events: any[];
  items: any;

  constructor(private router: Router, private _spiderService: SpiderService) {}

  ngOnInit(): void {
    this.items = Array.from({ length: this.events.length }).map(
      (_, i) => this.events[i]
    );
  }

  goToRouter(id) {
    this.router.navigate(['event', id]);
  }
}
