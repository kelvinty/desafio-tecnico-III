import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPacientes } from './lista-pacientes/lista-pacientes';
import { Paciente } from './paciente';

const routes: Routes = [
  {
    path: '',
    component: Paciente,
    children: [
      {
        path: 'lista-paciente',
        component: ListaPacientes
      },
      {
        path: '',
        redirectTo: 'lista-paciente',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '',
    redirectTo: 'paciente',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
