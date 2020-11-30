import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  constructor(private _httpClient: HttpClient) {}

  public getEvents(id?: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text',
      }),
    };

    const path = '/' + id;

    return this._httpClient.get('/api/Events' + (id ? path : ''), httpOptions);
  }
}
