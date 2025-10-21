import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, filter, take } from 'rxjs';
import { Paciente } from '../../../common/interfaces/paciente';
import { PacienteService } from '../../../services/paciente/paciente-service';
import { HttpErrorResponse } from '@angular/common/http';
import { PacienteResponse } from '../../../common/interfaces/paciente-response';
import { DicomModalidade } from '../../../common/enums/dicom.enum';
import { MatButtonModule } from '@angular/material/button';
import { ExameService } from '../../../services/exame/exame-service';
import { ListaExames } from '../lista-exames/lista-exames';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-add-exame',
  imports: [MatInputModule, MatDialogModule, ReactiveFormsModule, CommonModule, MatSelectModule,MatButtonModule],
  templateUrl: './add-exame.html',
  styleUrl: './add-exame.scss'
})
export class AddExame {

  isDetalhePaciente = false;
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
    private pacienteService: PacienteService,
    private exameService: ExameService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ListaExames>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {

    this.listaPacientes();
    this.verificarRota();
    this.exameForm = this.fb.group({
      tipoExame: ['', Validators.required],
      dataExame: ['',Validators.required],
      resultado: [''],
      pacienteId: ['',Validators.required],
    });

    if(this.router.url.includes('detalhe-paciente')){
      console.log(this.router.url);
      // this.isDetalhePaciente = true;
      this.exameForm.patchValue({pacienteId:this.data.pacienteId});
      this.exameForm.get('pacienteId')?.disable();
    }

  }
  
  verificarRota(){
    console.log(this.router.url);
    
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

  adiciona() {
    console.log(this.exameForm.value);
    this.exameForm.patchValue({tipoExame:this.exameForm.value.tipoExame.value});
    this.exameForm.get('pacienteId')?.enable();
    this.exameService.postExame(this.exameForm.value).pipe(take(1)).subscribe({
      next: () => {
        console.log('Exame adicionado com sucesso:', 'Fechar');
        this.exameService.resetLastKey(); // Resetar a chave de idempotência após o sucesso
        this.dialogRef.close(true); // Fechar o diálogo e indicar sucesso
      },
      error: (err:HttpErrorResponse) => {
        console.error('Erro ao adicionar exame:', err);
        this.exameService.resetLastKey(); // Resetar a chave de idempotência em caso de erro
      }
    });
  }
}
