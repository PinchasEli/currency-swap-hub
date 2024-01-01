import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { keys, map, get } from 'lodash-es';

import { CurrencyService } from '../../services/currency.service';
import { SelectItem } from 'src/app/shared/models/select-item.interface';
import { Subscription } from 'rxjs';
import { HistoryDataService } from '../../services/history-data.service';

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
  // private dataCurrency: any;

  private dataCurrency = {
      success: true,
      timestamp: 1704110223,
      base: "EUR",
      date: "2024-01-01",
      rates: {
          "AED": 4.059017,
          "AFN": 78.282862,
          "ALL": 103.656755,
          "AMD": 448.245429,
          "ANG": 1.997394,
          "AOA": 915.955126,
          "ARS": 894.957637,
          "AUD": 1.622416,
          "AWG": 1.989279,
          "AZN": 1.849602,
          "BAM": 1.956871,
          "BBD": 2.237725,
          "BDT": 121.626595,
          "BGN": 1.957924,
          "BHD": 0.417629,
          "BIF": 3156.928521,
          "BMD": 1.105155,
          "BND": 1.462201,
          "BOB": 7.658193,
          "BRL": 5.3642,
          "BSD": 1.108307,
          "BTC": 2.5917661e-5,
          "BTN": 92.192478,
          "BWP": 14.856134,
          "BYN": 3.659003,
          "BYR": 21661.040126,
          "BZD": 2.233923,
          "CAD": 1.464325,
          "CDF": 2957.394554,
          "CHF": 0.929992,
          "CLF": 0.035459,
          "CLP": 978.42572,
          "CNY": 7.82295,
          "COP": 4293.350772,
          "CRC": 575.815278,
          "CUC": 1.105155,
          "CUP": 29.28661,
          "CVE": 110.325407,
          "CZK": 24.733263,
          "DJF": 197.328044,
          "DKK": 7.464079,
          "DOP": 64.275193,
          "DZD": 148.45103,
          "EGP": 34.250158,
          "ERN": 16.577327,
          "ETB": 62.414174,
          "EUR": 1,
          "FJD": 2.425761,
          "FKP": 0.86798,
          "GBP": 0.868014,
          "GEL": 2.967394,
          "GGP": 0.86798,
          "GHS": 13.26026,
          "GIP": 0.86798,
          "GMD": 74.404599,
          "GNF": 9529.217557,
          "GTQ": 8.669747,
          "GYD": 232.047053,
          "HKD": 8.642478,
          "HNL": 27.344972,
          "HRK": 7.715939,
          "HTG": 146.150022,
          "HUF": 383.780032,
          "IDR": 17008.337119,
          "ILS": 3.981434,
          "IMP": 0.86798,
          "INR": 91.996443,
          "IQD": 1450.694302,
          "IRR": 46532.55605,
          "ISK": 150.301644,
          "JEP": 0.86798,
          "JMD": 171.223751,
          "JOD": 0.784218,
          "JPY": 155.86025,
          "KES": 173.995994,
          "KGS": 98.453077,
          "KHR": 4527.478942,
          "KMF": 491.959818,
          "KPW": 994.639598,
          "KRW": 1430.656369,
          "KWD": 0.339592,
          "KYD": 0.923606,
          "KZT": 506.407275,
          "LAK": 22760.462095,
          "LBP": 16657.120317,
          "LKR": 358.95654,
          "LRD": 208.294093,
          "LSL": 20.478444,
          "LTL": 3.263236,
          "LVL": 0.668497,
          "LYD": 5.280891,
          "MAD": 10.969706,
          "MDL": 19.172498,
          "MGA": 5106.796137,
          "MKD": 61.615285,
          "MMK": 2327.374313,
          "MNT": 3769.403956,
          "MOP": 8.917683,
          "MRU": 43.764236,
          "MUR": 48.958201,
          "MVR": 17.017083,
          "MWK": 1865.621489,
          "MXN": 18.759174,
          "MYR": 5.078159,
          "MZN": 69.901005,
          "NAD": 20.478958,
          "NGN": 993.645026,
          "NIO": 40.562209,
          "NOK": 11.24428,
          "NPR": 147.507765,
          "NZD": 1.748664,
          "OMR": 0.425441,
          "PAB": 1.108207,
          "PEN": 4.092541,
          "PGK": 4.190294,
          "PHP": 61.223429,
          "PKR": 308.317114,
          "PLN": 4.355803,
          "PYG": 8073.420461,
          "QAR": 4.023849,
          "RON": 4.977069,
          "RSD": 117.23519,
          "RUB": 98.635361,
          "RWF": 1395.263953,
          "SAR": 4.144701,
          "SBD": 9.311785,
          "SCR": 14.859892,
          "SDG": 664.198205,
          "SEK": 11.149192,
          "SGD": 1.458256,
          "SHP": 1.406476,
          "SLE": 25.192116,
          "SLL": 21826.813177,
          "SOS": 631.043591,
          "SRD": 40.609474,
          "STD": 22874.479446,
          "SYP": 14369.207912,
          "SZL": 20.4552,
          "THB": 37.995561,
          "TJS": 12.129841,
          "TMT": 3.879094,
          "TND": 3.386472,
          "TOP": 2.575672,
          "TRY": 32.571682,
          "TTD": 7.522119,
          "TWD": 33.910136,
          "TZS": 2789.527357,
          "UAH": 42.138472,
          "UGX": 4189.293775,
          "USD": 1.105155,
          "UYU": 43.263688,
          "UZS": 13674.487228,
          "VEF": 3961538.835921,
          "VES": 39.615042,
          "VND": 26822.114483,
          "VUV": 128.730145,
          "WST": 2.96525,
          "XAF": 656.316355,
          "XAG": 0.046447,
          "XAU": 0.000536,
          "XCD": 2.986737,
          "XDR": 0.825752,
          "XOF": 656.316355,
          "XPF": 119.331742,
          "YER": 276.564973,
          "ZAR": 20.219039,
          "ZMK": 9947.71456,
          "ZMW": 28.520616,
          "ZWL": 355.859494
      }
  }

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
        console.log('result :>> ', result);
        this.dataCurrency = result;
        this.options = map(keys(result.rates), (key: any) => ({ value: key, text: key }));
        console.log('this.options :>> ', this.options);
      }
    );

    this.options = map(keys(this.dataCurrency.rates), (key: any) => ({ value: key, text: key }));
  }

  ngOnInit() {
    this.subscription = this.form.valueChanges.subscribe(_ => this.form.valid && this.calculateCurrency());
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  get getFrom() {
    const sum = +this.form.get('sum')?.value || 1;
    return `${sum.toFixed(2)} ${this.form.get('from')?.value}`
  }
  
  get getConversion () {
    return `${this.conversion} ${this.form.get('from')?.value}`
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
