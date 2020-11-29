import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  constructor(private _httpClient: HttpClient) {}

  public getEvents(id?: string): Observable<any> {
    const path = '/' + id;

    return this._httpClient.get('/api/Events' + (id ? path : ''));
  }
}
