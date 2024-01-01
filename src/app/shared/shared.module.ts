import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInputComponent } from './components/basic-input/basic-input.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [
  CommonModule
];

const pipes = [];

const components = [
  BasicInputComponent,
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
