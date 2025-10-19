import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing-module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class PacienteModule { }
