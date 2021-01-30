import {Component, OnInit, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IEventFilter} from '../../../../core/interfaces/event';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent implements OnInit {
  public formGroup: FormGroup;
  @Output()
  private filtered = new EventEmitter<IEventFilter>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      search: [],
      city: [],
      date_begin: [],
      date_end: [],
    });
  }

  public ngOnInit(): void {}

  public onAutocompleteSelected($event: any): void {
    console.log($event);
  }

  public onLocationSelected($event: Location): void {
    console.log($event);
  }

  public doFilter(): void {
    this.filtered.emit(this.formGroup.value);
  }
}
