import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamesRoutingModule } from './exames-routing-module';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ExamesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(),
  ]
})
export class ExamesModule { }
