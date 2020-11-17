import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedComponent implements OnInit {
  @Input() events: any[];
  items: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = Array.from({ length: this.events.length }).map(
      (_, i) => this.events[i]
    );
  }

  goToRouter(title) {
    this.router.navigate(['event', title]);
  }
}
