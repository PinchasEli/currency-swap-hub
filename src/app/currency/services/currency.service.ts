import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  private baseUrl = `${environment.serverUrl}`;
  private accessKey = `050beeaad0ad5cda72460c6758d5a11e`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient) { }

  get(params: any = {}): Observable<any> {
    params = { access_key: this.accessKey, ...params };
    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  getSymbols(): Observable<any> {
    const params = { access_key: this.accessKey };
    return this.http.get<any>(`${this.baseUrl}/symbols`, { params });
  }
}
