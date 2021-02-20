import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ScrollPaginationService } from 'src/app/core/services/scroll-pagination/scroll-pagination.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
  @ViewChild(PerfectScrollbarComponent, { static: false })
  componentRef?: PerfectScrollbarComponent;
  detectScrollDown = false;
  constructor(
    private scrollPaginationService: ScrollPaginationService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  getEvents() {
    this.scrollPaginationService.endPageSubject.next();
    this.ref.detectChanges();
  }

  public scrollToTop(): void {
    this.componentRef?.directiveRef?.scrollToTop();
  }

  public scrollDown(event: CustomEvent): void {
    this.detectScrollDown = event.returnValue;
    this.ref.detectChanges();
  }

  public psYReachStart(): void {
    this.detectScrollDown = false;
    this.ref.detectChanges();
  }
}
