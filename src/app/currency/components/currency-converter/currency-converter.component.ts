import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { map, get } from 'lodash-es';

import { CurrencyService } from '../../services/currency.service';
import { HistoryDataService } from '../../services/history-data.service';

import { SelectItem } from 'src/app/shared/models/select-item.interface';
import { Currency } from '../../models/currency.interface';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  options: SelectItem[];
  conversion: string;

  private currencyData: any;
  private loadCurrencyDataSubscription: Subscription;
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private currencyService: CurrencyService,
              private historyDataService: HistoryDataService) { 
    this.form = this.fb.group({
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
      sum: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getCurrencyData();
    this.subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(_ => this.form.valid && this.calculateCurrency());
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  get getFrom() {
    const sum = +this.form.get('sum')?.value || 1;
    return `${sum.toFixed(2)} ${this.form.get('from')?.value}`
  }
  
  get getConversion () {
    return `${this.conversion} ${this.form.get('to')?.value}`
  }

  get getDateGate() {
    return this.currencyData?.date ? new Date(this.currencyData.date) : new Date();
  }

  private calculateCurrency() {
    const fromSymbol = this.form.get('from')?.value
    const toSymbol = this.form.get('to')?.value
    const fromValue = get(this.currencyData.rates, fromSymbol);
    const toValue = get(this.currencyData.rates, toSymbol);
    const sum = this.form.get('sum')?.value || 1;

    this.conversion = (sum * (toValue / fromValue)).toFixed(2);
    this.historyDataService.saveData({
      from: fromSymbol,
      sum: sum,
      to: toSymbol,
      conversion: this.conversion,
      date: new Date()
    });
  }

  private getCurrencyData() {
    this.loadCurrencyDataSubscription = this.currencyService.done
      .subscribe((data: Currency) => {
        this.currencyData = data;
        this.options = map(this.currencyData.rates, (value: number, key: string) => ({ value: key, text: key }));
        this.loadCurrencyDataSubscription?.unsubscribe();
      });
    this.currencyService.getData();
  }
}
