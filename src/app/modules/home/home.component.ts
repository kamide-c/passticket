import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SpiderService } from '../../core/services/spider.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recommended: any[];
  events: any[];

  myControl = new FormControl('');
  date = new FormControl({ begin: null, end: null });
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private _spiderService: SpiderService) {}

  ngOnInit(): void {
    this._spiderService.getEvents().subscribe((res: any[]) => {
      if (res) {
        this.recommended = res.slice(0, 10);
        this.events = res.slice(10);
      }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  formatDate(date) {
    return date && moment(date).format('YYYY-MM-DD');
  }

  searchValidate() {
    return (
      this.myControl.value.trim().length !== 0 || this.date.value.begin !== null
    );
  }
}
