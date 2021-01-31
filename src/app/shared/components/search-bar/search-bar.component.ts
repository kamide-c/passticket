import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import PlaceResult = google.maps.places.PlaceResult;
import { Router } from '@angular/router';
import { CalendarFooterComponent } from './calendar-footer/calendar-footer.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent implements OnInit {
  @Input('stringToSeek') stringToSeek: string;
  @Input('dates') dates: any;
  @Input('placeToSeek') placeToSeek: string;

  form = new FormGroup({
    myControl: new FormControl(''),
    date: new FormControl({ begin: null, end: null }),
    place: new FormControl(),
    location: new FormControl(),
    placeResult: new FormControl(),
  });

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  routePath: string;
  calendarFooter = CalendarFooterComponent;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.stringToSeek)
      this.form.get('myControl').setValue(this.stringToSeek);
    if (this.dates && this.dates.begin) {
      this.form.get('date').setValue({
        begin: new Date(moment(this.dates.begin).format()),
        end: new Date(moment(this.dates.end).format()),
      });
    }
    if (this.placeToSeek) this.form.get('place').setValue(this.placeToSeek);

    this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.cd.detectChanges();
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
    if (this.router.url.match('explore')) {
      this.routePath = '/explore' + this.form.get('myControl').value;
    } else {
      this.routePath = '/searchResult/' + this.form.get('myControl').value;
    }

    // return (
    //   this.myControl.value.trim().length !== 0 ||
    //   this.date.value.begin !== null ||
    //   this.place.value !== (null || '')
    // );
    return true;
  }

  removeOption() {
    this.form.get('date').setValue({ begin: null, end: null });
  }

  removePlace() {
    this.form.get('place').setValue('');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectLocationDialog, {
      width: '1280px',
      data: {
        placeResult: this.form.get('placeResult'),
        location: this.form.get('location'),
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.form.get('place').setValue(this.form.get('placeResult').value.name);
      console.log('The dialog was closed');
    });
  }

  onSubmit() {
    this.router.navigate([
      this.searchValidate() ? this.routePath : '',
      {
        begin: this.formatDate(this.form.get('date').value.begin),
        end: this.formatDate(this.form.get('date').value.end),
        location: this.form.get('place').value,
      },
    ]); //your router URL need to pass it here
  }
}

@Component({
  selector: 'search-bar-location-dialog',
  templateUrl: 'search-bar__location.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SelectLocationDialog {
  googleMapAutocomplete = this.data.placeResult;

  options = {
    types: ['(cities)'],
    componentRestrictions: { country: 'br' },
  };

  constructor(
    public dialogRef: MatDialogRef<SelectLocationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    this.data.location.setValue(location);
    console.log('onLocationSelected: ', location);
  }

  clear() {
    this.data.location.setValue('');
    this.data.placeResult.setValue('');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
