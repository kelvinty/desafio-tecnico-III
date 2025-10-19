import { Component } from '@angular/core';
import { ListaExames } from './lista-exames/lista-exames';

@Component({
  selector: 'app-exames',
  imports: [ListaExames],
  templateUrl: './exames.html',
  styleUrl: './exames.scss'
})
export class Exames {

}
