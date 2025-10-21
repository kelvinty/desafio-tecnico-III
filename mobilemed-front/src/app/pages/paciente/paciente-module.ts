import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing-module';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    RouterModule
  ],
  providers: [
    provideHttpClient(),
    
  ],
})
export class PacienteModule { }
