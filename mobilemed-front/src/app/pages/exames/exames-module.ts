import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamesRoutingModule } from './exames-routing-module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ExamesRoutingModule
  ],
  providers: [
    provideHttpClient(),
  ]
})
export class ExamesModule { }
