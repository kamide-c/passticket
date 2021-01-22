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

  public filters = {
    descricao: null,
    informacoes: null,
    atracoes: null,
    titulo: null,
    endereco: null,
    cidade: null,
    estado: null,
    local: null,
    ticketeria: null,
    buscageral: null,
    data_inicio: null,
    data_fim: null,
  };
  constructor(private _httpClient: HttpClient) {}

  public getEvents(filter: any): Observable<any> {
    this.loadingSubject.next(true);
    let EventsObservable: any;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text',
      }),
    };

    EventsObservable = this._httpClient
      .post(environment.baseUrl + '/Events/filtro', filter, httpOptions)
      .pipe(
        switchMap((response) => {
          this.loadingSubject.next(false);

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
