import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Currency } from '../models/currency.interface';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  private currencyData$ = new BehaviorSubject<Currency | null>(null);

  private baseUrl = `${environment.serverUrl}`;
  private accessKey = `${environment.accessKey}`;
  private localStorageKey = 'currencyData';

  constructor(private http: HttpClient) {
    this.checkCurrencyData();
  }

  get(params: any = {}): Observable<any> {
    params = { access_key: this.accessKey, ...params };
    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  getData(): Observable<Currency | null> {
    return this.currencyData$.asObservable();
  }

  private checkCurrencyData() {
    const storedCurrencyData = localStorage.getItem(this.localStorageKey);
    let needRefresh = true;
    let currencyData;
    
    if (storedCurrencyData) {
      currencyData = JSON.parse(storedCurrencyData);
      needRefresh = this.needRefresh(currencyData);
    }

    if (needRefresh) {
      this.get({ format: 1 }).subscribe(result => {
        this.saveToLocalStorage(result);
        this.currencyData$.next(result);
      });
    }
    else {
      this.currencyData$.next(currencyData);
    }
  }

  private needRefresh(currencyData: Currency): boolean {
    if (!currencyData?.date) return true;

    const currentDate = new Date();
    const lastTimeUpdated = new Date(currencyData.date);
    return currentDate.getHours() >= 10 && currentDate.getDate() > lastTimeUpdated.getDate();
  }

  private saveToLocalStorage(data: Currency) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }
}
