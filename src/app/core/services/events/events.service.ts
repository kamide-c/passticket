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

  public events(filter: any): Observable<IPaginatedResponse<IEvent>> {
    // @ts-ignore
    const filterTreated: IEventFilter = {};
    if (!filter.date_begin) {
      filterTreated.data_inicio = moment().toISOString();
    }
    filterTreated.titulo = filter.search ? filter.search : null;
    filterTreated.data_inicio = filter.date_begin ? filter.date_begin : new Date();
    filterTreated.data_fim = filter.date_end ? filter.date_end : null;
    filterTreated.cidade = filter.city ? filter.city : null;
    filterTreated.estado = filter.state ? filter.state : null;
    filterTreated.Paginacao = {
      page_number: filter.page_number ? filter.page_number : 1,
      page_size: filter.page_size ? filter.page_size : 12,
    };
    return this.httpClient.post<IPaginatedResponse<IEvent>>(environment.baseUrl + '/Events/filtro', filterTreated);
  }

  public event(id: string): Observable<IPaginatedResponse<IEvent>> {
    return this.httpClient.get<IPaginatedResponse<IEvent>>(environment.baseUrl + '/Events/' + id);
  }
}
