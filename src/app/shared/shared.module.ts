import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectInputComponent } from './components/select-input/select-input.component';

const modules = [
  CommonModule
];

const components = [
  SelectInputComponent
];


@NgModule({
  declarations: [
    components,
  ],
  providers: [],
  imports: [
    ReactiveFormsModule,
    modules,
  ],
  exports: [
    modules,
    components,
  ]
})
export class SharedModule { }
