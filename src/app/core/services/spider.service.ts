import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  private _url = 'http://40.74.238.182:8080/Events';

  constructor(private _httpClient: HttpClient) {}

  public getEvents(id?: string): Observable<any> {
    const path = '/' + id;

    return this._httpClient.get(this._url + (id ? path : ''));
  }
}
