import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectInputComponent } from './components/select-input/select-input.component';

const modules = [
  CommonModule
];

const pipes = [];

const components = [
  SelectInputComponent
];

const directives = [];

@NgModule({
  declarations: [
    components,
    // pipes,
    // directives,
  ],
  providers: [
    // pipes
  ],
  imports: [
    ReactiveFormsModule,
    modules,
  ],
  exports: [
    modules,
    components,
    // pipes,
    // directives
  ]
})
export class SharedModule { }
