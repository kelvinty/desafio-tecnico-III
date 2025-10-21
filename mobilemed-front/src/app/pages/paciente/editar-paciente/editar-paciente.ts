import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from '../../../services/paciente/paciente-service';
import { SnackbarService } from '../../../services/snack/snackbar-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ListaPacientes } from '../lista-pacientes/lista-pacientes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editar-paciente',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInputModule, CommonModule],
  templateUrl: './editar-paciente.html',
  styleUrl: './editar-paciente.scss'
})
export class EditarPaciente {
  pacienteForm!: FormGroup;

  sexos:string[] = ['Masculino', 'Feminino', 'Outro'];
  estadosCivis:string[] = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo'];

  constructor(
    private fb: FormBuilder, 
    private service: PacienteService,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<ListaPacientes>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pacienteForm = this.fb.group({
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      documento: new FormControl('', [Validators.required, Validators.minLength(11)]),
      data_nascimento: new FormControl('', Validators.required),
      sexo: new FormControl('',Validators.required),
      estado_civil: new FormControl('', Validators.required),
      nacionalidade: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    this.pacienteForm.patchValue(this.data);
  }

   edita() {
    if (this.pacienteForm.valid) {
      this.service.updatePaciente(this.data.id,this.pacienteForm.value).subscribe({
        next: (res) => {
          this.snack.success('Paciente editado com sucesso!', 'Fechar');
          this.service.resetLastKey(); // Reseta a última chave após o sucesso
          this.dialogRef.close();
        },
        error: (err) => {
          this.snack.error('Erro ao editar paciente. Tente novamente.', 'Fechar');
        }
      });
    } else {
      this.pacienteForm.markAllAsTouched();
    }
  }
}
