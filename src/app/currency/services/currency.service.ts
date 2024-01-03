import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Currency } from '../models/currency.interface';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  done: EventEmitter<any> = new EventEmitter();

  private baseUrl = `${environment.serverUrl}`;
  private accessKey = `050beeaad0ad5cda72460c6758d5a11e`;
  // private accessKey = `c19bb18beec503922fd1708c62411bdf`;
  private localStorageKey = 'currencyData';
  private currencyData:  Currency;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  get(params: any = {}): Observable<any> {
    params = { access_key: this.accessKey, ...params };
    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  getData() {
    this.checkCurrencyData();
  }

  private checkCurrencyData() {
    const storedCurrencyData = localStorage.getItem(this.localStorageKey);
    let needRefresh = true;
    if (storedCurrencyData) {
      this.currencyData = JSON.parse(storedCurrencyData)
      needRefresh = this.needRefresh();
    }

    if (needRefresh) {
      this.get({ format: 1 }).subscribe(result => {
        this.currencyData = result
        this.saveToLocalStorage(result);
        this.done.emit(this.currencyData);
      });
    }
    else {
      this.done.emit(this.currencyData);
    }
  }

  private needRefresh(): boolean {
    if (!this.currencyData?.date) return true;

    const currentDate = new Date();
    const lastTimeUpdated = new Date(this.currencyData?.date) || Date.now();
    return this.isCurrentTime() && currentDate.getDate() > lastTimeUpdated.getDate();
  }

  private isCurrentTime() {
    const currentDate = new Date();
    return currentDate.getHours() >= 8 && currentDate.getMinutes() >= 0;
  }

  private saveToLocalStorage(data: Currency) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }
}
