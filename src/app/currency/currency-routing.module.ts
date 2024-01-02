import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyAboutComponent } from './components/currency-about/currency-about.component';


const routes: Routes = [
  {
    path: '',
    component: CurrencyConverterComponent
  },
  {
    path: 'about',
    component: CurrencyAboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
