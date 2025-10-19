import { Component } from '@angular/core';
import { ListaPacientes } from './lista-pacientes/lista-pacientes';

@Component({
  selector: 'app-paciente',
  imports: [ListaPacientes],
  templateUrl: './paciente.html',
  styleUrl: './paciente.scss'
})
export class Paciente {

}
