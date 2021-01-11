import { ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from 'rxjs';
import {
  SatCalendar,
  SatCalendarFooter,
  SatDatepicker,
} from 'saturn-datepicker';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-footer',
  templateUrl: './calendar-footer.component.html',
  styleUrls: [],
})
export class CalendarFooterComponent<Date> implements SatCalendarFooter<Date> {
  private destroyed = new Subject<void>();

  constructor(
    private calendar: SatCalendar<Date>,
    private datePicker: SatDatepicker<Date>,
    cdr: ChangeDetectorRef
  ) {
    calendar.stateChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  setDateClear() {
    this.calendar.beginDate = null;
    this.calendar.endDate = null;
    this.calendar.activeDate = this.calendar.beginDate;
    this.calendar.beginDateSelectedChange.emit(this.calendar.beginDate);
    this.calendar.dateRangesChange.emit({
      begin: this.calendar.beginDate,
      end: this.calendar.endDate,
    });
    this.datePicker.close();
  }
}
