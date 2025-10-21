import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PacienteService } from '../../../services/paciente/paciente-service';
import { SnackbarService } from '../../../services/snack/snackbar-service';
import { ListaPacientes } from '../lista-pacientes/lista-pacientes';

@Component({
  selector: 'app-apagar-paciente',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './apagar-paciente.html',
  styleUrl: './apagar-paciente.scss'
})
export class ApagarPaciente {

  constructor(
    private service: PacienteService,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<ListaPacientes>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  excluir() {
    this.service.delPaciente(this.data.id).subscribe({
      next: (res) => {
        this.snack.success('Paciente excluído com sucesso!', 'Fechar');
        this.service.resetLastKey(); // Reseta a última chave após o sucesso
        this.dialogRef.close();
      },
      error: (err) => {
        this.snack.error('Erro ao excluir paciente. Tente novamente.', 'Fechar');
      }
    });
    // Lógica para excluir o paciente
  }
}
