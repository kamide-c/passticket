import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScrollPaginationService } from 'src/app/core/services/scroll-pagination/scroll-pagination.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
  constructor(
    private scrollPaginationService: ScrollPaginationService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  getEvents() {
    this.scrollPaginationService.endPageSubject.next();
    this.ref.detectChanges();
  }
}
