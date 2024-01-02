import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { map, get } from 'lodash-es';

import { CurrencyService } from '../../services/currency.service';
import { HistoryDataService } from '../../services/history-data.service';

import { SelectItem } from 'src/app/shared/models/select-item.interface';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  options: SelectItem[];
  conversion: string;

  private subscription: Subscription;
  private dataCurrency: any;

  constructor(private fb: FormBuilder,
              private currencyService: CurrencyService,
              private historyDataService: HistoryDataService) { 
    this.form = this.fb.group({
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
      sum: [null, [Validators.required]],
    });

    this.currencyService.get({ format: 1 }).subscribe(
      result => {
        this.dataCurrency = result;
        this.options = map(result.rates, (value: number, key: string) => ({ value: key, text: key }));
      }
    );
  }

  ngOnInit() {
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

  private calculateCurrency() {
    const fromSymbol = this.form.get('from')?.value
    const toSymbol = this.form.get('to')?.value
    const fromValue = get(this.dataCurrency.rates, fromSymbol);
    const toValue = get(this.dataCurrency.rates, toSymbol);
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
}
