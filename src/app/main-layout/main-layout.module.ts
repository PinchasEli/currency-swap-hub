import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';


@NgModule({
  declarations: [
    MainLayoutComponent
  ],

  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ],

  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
