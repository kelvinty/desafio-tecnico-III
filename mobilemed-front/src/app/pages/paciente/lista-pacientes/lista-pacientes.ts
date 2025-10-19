import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Paciente } from '../../../common/interfaces/paciente';
import { MatSort } from '@angular/material/sort';
import { PacienteService } from '../../../services/paciente/paciente-service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { AddPaciente } from '../add-paciente/add-paciente';
import { ApagarPaciente } from '../apagar-paciente/apagar-paciente';
import { EditarPaciente } from '../editar-paciente/editar-paciente';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-lista-pacientes',
  imports: [
    MatTableModule, MatPaginator, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatIconModule
  ],
  templateUrl: './lista-pacientes.html',
  styleUrl: './lista-pacientes.scss'
})
export class ListaPacientes {

  // pacientes.component.ts
  displayedColumns: string[] = [
    // 'id',
    'nome',
    'sobrenome',
    // 'documento',
    // 'data_nascimento',
    // 'sexo',
    // 'estado_civil',
    // 'nacionalidade',
    'telefone',
    'email',
    // 'data_cadastro'
    'acoes'
  ];

  dataSource = new MatTableDataSource<Paciente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pacientesService: PacienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarPacientes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarPacientes() {
    this.pacientesService.getPacientes().subscribe((resp:any) => {
      this.dataSource.data = resp.data;
    });
  }

  adicionarPaciente() {
    const dialogRef = this.dialog.open(AddPaciente,{
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPacientes();
    });

    console.log('Adicionar novo paciente');
  }

  apagarPaciente(id: number) {
    const dialogRef = this.dialog.open(ApagarPaciente,{
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPacientes();
    });
    
    console.log(`Apagar paciente com ID: ${id}`);
  }

  editarPaciente(id: number) {
    const dialogRef = this.dialog.open(EditarPaciente,{
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPacientes();
    });
    
    // Lógica para editar um paciente existente
    console.log(`Editar paciente com ID: ${id}`); 
  }

}
