import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  loadingSubject = new Subject();
  constructor(private _httpClient: HttpClient) {}

  public getEvents(): Observable<any> {
    this.loadingSubject.next(true);
    let EventsObservable: any;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text',
      }),
    };

    EventsObservable = this._httpClient
      .get(environment.baseUrl + '/Events', httpOptions)
      .pipe(
        switchMap((response) => {
          if (!localStorage.getItem('EventsJson')) {
            this.loadingSubject.next(false);
            localStorage.setItem('EventsJson', JSON.stringify(response));
          } else if (
            response !== JSON.parse(localStorage.getItem('EventsJson'))
          ) {
            this.loadingSubject.next(false);
            localStorage.setItem('EventsJson', JSON.stringify(response));
          } else {
            this.loadingSubject.next(false);
          }

          return of(response);
        })
      );

    return EventsObservable;
  }

  public getEvent(id: string): Observable<any> {
    this.loadingSubject.next(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text',
      }),
    };

    return this._httpClient.get('/api/Events/' + id, httpOptions).pipe(
      map((res) => {
        this.loadingSubject.next(false);

        return res;
      })
    );
  }
}
