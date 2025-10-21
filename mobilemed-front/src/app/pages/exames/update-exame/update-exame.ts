import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, take } from 'rxjs';
import { DicomModalidade } from '../../../common/enums/dicom.enum';
import { PacienteService } from '../../../services/paciente/paciente-service';
import { ExameService } from '../../../services/exame/exame-service';
import { ListaExames } from '../lista-exames/lista-exames';
import { PacienteResponse } from '../../../common/interfaces/paciente-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Paciente } from '../../../common/interfaces/paciente';


@Component({
  selector: 'app-update-exame',
  imports: [MatInputModule, MatDialogModule, ReactiveFormsModule, CommonModule, MatSelectModule, MatButtonModule],
  templateUrl: './update-exame.html',
  styleUrl: './update-exame.scss'
})
export class UpdateExame {

  pacientes = new BehaviorSubject<Paciente[]>([]);
  modalidades = [
    { value: DicomModalidade.CR, label: 'Computed Radiography' },
    { value: DicomModalidade.CT, label: 'Computed Tomography' },
    { value: DicomModalidade.DX, label: 'Digital Radiography' },
    { value: DicomModalidade.MG, label: 'Mammography' },
    { value: DicomModalidade.MR, label: 'Magnetic Resonance' },
    { value: DicomModalidade.NM, label: 'Nuclear Medicine' },
    { value: DicomModalidade.OT, label: 'Other' },
    { value: DicomModalidade.PT, label: 'Positron Emission Tomography' },
    { value: DicomModalidade.RF, label: 'Radio Fluoroscopy' },
    { value: DicomModalidade.US, label: 'Ultrasound' },
    { value: DicomModalidade.XA, label: 'X-Ray Angiography' },
  ];
  exameForm!: FormGroup;

  constructor(
    private cd: ChangeDetectorRef,
    private pacienteService: PacienteService,
    private exameService: ExameService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ListaExames>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {

    console.log('Dados recebidos para edição:', this.data);
   

    this.listaPacientes();

    this.exameForm = this.fb.group({
      tipoExame: ['', Validators.required],
      dataExame: ['',Validators.required],
      resultado: [''],
      pacienteId: ['',Validators.required],
    });

    this.exameForm.patchValue(this.data);
    this.exameForm.patchValue({tipoExame:this.data.tipoExame});
    this.exameForm.patchValue({pacienteId:this.data.paciente.id});
    this.exameForm.get('pacienteId')?.disable();
    this.cd.detectChanges();

  }

  compareModalidadeFn(m1: any, m2: any): boolean {
    console.log('Comparando modalidades:','m1:', m1,'m2:', m2);
    return m1 && m2 ? m1.value === m2 : m1 === m2;
  }

  compareFn(p1: any, p2: any): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  listaPacientes() {

    this.pacienteService.getPacientes(1,100).pipe(take(1)).subscribe({
      next: (pacientes:PacienteResponse) => {
        this.pacientes.next(pacientes.data);
      },
      error: (err:HttpErrorResponse) => {
        console.error('Erro ao carregar pacientes:', err);
      }
    })

  }

  edita() {
    this.exameService.updateExame(this.data.id,this.exameForm.value).pipe(take(1)).subscribe({
      next: () => {
        console.log('Exame editado com sucesso:', 'Fechar');
        this.exameService.resetLastKey(); // Resetar a chave de idempotência após o sucesso
        this.dialogRef.close(true); // Fechar o diálogo e indicar sucesso
      },
      error: (err:HttpErrorResponse) => {
        console.error('Erro ao editar exame:', err);
        this.exameService.resetLastKey(); // Resetar a chave de idempotência em caso de erro
      }
    });
  }
}
