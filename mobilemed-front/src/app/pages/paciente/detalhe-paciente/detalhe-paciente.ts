import { Component } from '@angular/core';
import { PacienteService } from '../../../services/paciente/paciente-service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, mergeMap, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Exame } from '../../../common/interfaces/exame';
import { Paciente } from '../../../common/interfaces/paciente';
import { MatDialog } from '@angular/material/dialog';
import { AddExame } from '../../exames/add-exame/add-exame';
import { ApagaExame } from '../../exames/apaga-exame/apaga-exame';

@Component({
  selector: 'app-detalhe-paciente',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, MatIconModule],
  templateUrl: './detalhe-paciente.html',
  styleUrl: './detalhe-paciente.scss'
})
export class DetalhePaciente {

  paciente = new BehaviorSubject<any>(null);;
  exames = new BehaviorSubject<Exame[]>([]);
  pacienteId!: string;
  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pegaPacienteRoute();
  }

  pegaPacienteRoute(){
    this.route.params.pipe(
      map(params => params['id']),
      mergeMap(id => this.pacienteService.getPaciente(id))
    ).subscribe({
      next: (resp:Paciente|any) => {
        this.paciente.next(resp);
        this.pegarExames(resp.id);
        this.pacienteId = resp.id;
        console.log('Paciente encontrado:', resp);
      },
      error: (err:HttpErrorResponse) => {
        console.error('Erro ao buscar paciente:', err);
      }
    })
  }

  pegarExames(idPaciente: string) {
    this.pacienteService.getExamePaciente(idPaciente).pipe(take(1)).subscribe({
      next: (resp:any) => {
        this.exames.next(resp);
        console.log('Exames do paciente:', resp);
      },
      error: (err:HttpErrorResponse) => {
        console.error('Erro ao buscar exames do paciente:', err);
      }
    });
  }

  adicionarExame() {
    const dialogRef = this.dialog.open(AddExame,{
      data: { pacienteId: this.pacienteId }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
  
      this.pegarExames(this.pacienteId);
    });

  }

  apagarExame(exame: Exame) {
    const dialogRef = this.dialog.open(ApagaExame,{
      data: exame
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      this.pegarExames(this.pacienteId);
    });
  }

}
