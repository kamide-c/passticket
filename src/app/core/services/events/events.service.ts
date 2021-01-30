import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IPaginatedResponse} from '../../interfaces/ipaginated-response';
import {IEvent, IEventFilter} from '../../interfaces/event';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private httpClient: HttpClient) {}

  public events(filter: IEventFilter): Observable<IPaginatedResponse<IEvent>> {
    if (!filter.data_inicio) {
      filter.data_inicio = moment().toISOString();
    }
    return this.httpClient.post<IPaginatedResponse<IEvent>>(environment.baseUrl + '/Events/filtro', filter);
  }

  public event(id: string): Observable<IPaginatedResponse<IEvent>> {
    return this.httpClient.get<IPaginatedResponse<IEvent>>(environment.baseUrl + '/Events/' + id);
  }
}
