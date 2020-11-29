import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  environmentUrl = 'Debug api';

  constructor(private _httpClient: HttpClient) {
    this.environmentUrl = environment.baseUrl;
  }

  public getEvents(id?: string): Observable<any> {
    const path = '/' + id;

    return this._httpClient.get(
      this.environmentUrl + '/Events' + (id ? path : '')
    );
  }
}
