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
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private baseUrl = `${environment.serverUrl}`;
  private accessKey = `${environment.accessKey}`;
  private localStorageKey = 'currencyData';
  private currencyData:  Currency;

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
    const lastTimeUpdated = new Date(this.currencyData.date);
    return currentDate.getHours() >= 10 && currentDate.getDate() > lastTimeUpdated.getDate();
  }

  private saveToLocalStorage(data: Currency) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }
}
