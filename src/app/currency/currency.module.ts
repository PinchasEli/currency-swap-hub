import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyAboutComponent } from './components/currency-about/currency-about.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



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
