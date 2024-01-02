import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyRoutingModule } from './currency-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyAboutComponent } from './components/currency-about/currency-about.component';


@NgModule({
  declarations: [
    CurrencyConverterComponent,
    CurrencyAboutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CurrencyRoutingModule
  ]
})
export class CurrencyModule { }
