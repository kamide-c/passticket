import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import PlaceResult = google.maps.places.PlaceResult;

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

  myControl = new FormControl('');
  date = new FormControl({ begin: null, end: null });
  place = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(public dialog: MatDialog) {}

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

  removeOption() {
    this.date = new FormControl({ begin: null, end: null });
  }

  removePlace() {
    this.place = new FormControl('');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectLocationDialog, {
      width: '1280px',
      data: { place: this.place },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.place);
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'search-bar-location-dialog',
  templateUrl: 'search-bar__location.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SelectLocationDialog {
  googleMapAutocomplete = this.data.place;
  constructor(
    public dialogRef: MatDialogRef<SelectLocationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
