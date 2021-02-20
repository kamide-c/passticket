import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent implements OnInit {
  @Output() scrollToTop = new EventEmitter<string>();
  @Input() windowScrolled!: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  scrollToTopEvent() {
    this.scrollToTop.emit();
  }

  ngOnInit() {}
}
