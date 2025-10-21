import { Component, Inject } from '@angular/core';
import { ExameService } from '../../../services/exame/exame-service';
import { SnackbarService } from '../../../services/snack/snackbar-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ListaExames } from '../lista-exames/lista-exames';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-apaga-exame',
  imports: [MatDialogModule, CommonModule, MatButtonModule],
  templateUrl: './apaga-exame.html',
  styleUrl: './apaga-exame.scss'
})

export class ApagaExame {

  constructor(
    private service: ExameService,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<ListaExames>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  excluir() {
    this.service.delExame(this.data.id).subscribe({
      next: (res) => {
        this.snack.success('Exame excluído com sucesso!', 'Fechar');
        this.service.resetLastKey(); // Reseta a última chave após o sucesso
        this.dialogRef.close();
      },
      error: (err) => {
        this.snack.error('Erro ao excluir Exame. Tente novamente.', 'Fechar');
      }
    });
    // Lógica para excluir o paciente
  }
}
