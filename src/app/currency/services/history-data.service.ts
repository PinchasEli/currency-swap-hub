import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HistoryItem } from '../models/history-item.interface';

@Injectable({
  providedIn: 'root',
})

export class HistoryDataService {

  private historyData$ = new BehaviorSubject([]);
  private localStorageKey = 'historyData';

  constructor() {
    const storedHistoryData = localStorage.getItem(this.localStorageKey);
    if (storedHistoryData) {
      this.historyData$.next(JSON.parse(storedHistoryData));
    }
  }

  getData(): Observable<HistoryItem[]> {
    return this.historyData$.asObservable();
  }

  getHistoryDataValue(): HistoryItem[] {
    return this.historyData$.value;
  }

  setData(data: any) {
    this.historyData$.next(data);
    this.saveToLocalStorage(data);
  }

  saveData(newItem: HistoryItem) {
    const currentData = this.getHistoryDataValue();
    const updatedData = [...currentData, newItem];
    this.setData(updatedData);
  }

  private saveToLocalStorage(data: HistoryItem[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }
}
