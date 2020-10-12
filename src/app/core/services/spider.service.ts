import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  private _jsonURL = 'assets/spider.json';

  constructor(private _httpClient: HttpClient) {}

  public getEvents(): Observable<any> {
    return this._httpClient.get(this._jsonURL);
  }
}
