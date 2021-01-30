import {Component, OnInit, Output, ViewEncapsulation, EventEmitter, Input} from '@angular/core';
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
  @Input()
  private emitEventOnChange = null;

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

  public onAutocompleteSelected(address: any): void {
    const formattedAddress = this.getAddress(address);
    this.formGroup.patchValue({
      city: formattedAddress.city,
      state: formattedAddress.state
    });
    this.doFilter();
  }

  public onLocationSelected(address: any): void {}

  public doFilter(fromButton?: boolean): void {
    if (!fromButton && !this.emitEventOnChange) {
      return;
    }
    const formData = this.formGroup.value;
    if (!formData.date_begin) {
      formData.date_begin = new Date();
    }
    this.filtered.emit(formData);
  }

  private getAddress(address: any) {
    let city = '';
    let state = '';
    address.address_components?.forEach(addressComponent => {
      if (addressComponent.types.some(type => type === 'administrative_area_level_2')) {
        city = addressComponent.long_name;
      } else if (addressComponent.types.some(type => type === 'administrative_area_level_1')) {
        state = addressComponent.short_name;
      }
    });
    return {
      city,
      state,
    };
  }
}
