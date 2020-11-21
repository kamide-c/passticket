import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input('stringToSeek') stringToSeek: string;
  @Input('dates') dates: any;

  myControl = new FormControl('');
  date = new FormControl({ begin: null, end: null });
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    this.stringToSeek && this.myControl.setValue(this.stringToSeek);
    if (this.dates && this.dates.begin) {
      this.date = new FormControl({
        begin: new Date(moment(this.dates.begin).format()),
        end: new Date(moment(this.dates.end).format()),
      });
    }

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
