import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
import { loadingService } from '../../../services/loading/loading-service';
import { RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-lista-pacientes',
  imports: [
    MatTableModule, MatPaginator, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatIconModule, RouterLink
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

  total = 0;
  limit = 10;
  page = 1;

  dataSource = new MatTableDataSource<Paciente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _loading: loadingService,
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
    this._loading.show();
    this.pacientesService.getPacientes(this.page,this.limit).subscribe((resp:any) => {
      this.total = resp.total;
      this.dataSource.data = resp.data;
      this._loading.hide();
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

  apagarPaciente(paciente: Paciente) {
    const dialogRef = this.dialog.open(ApagarPaciente,{
      width: '60vw',
      data: paciente
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPacientes();
    });
    
    console.log(`Apagar paciente com ID: ${paciente.id}`);
  }

  editarPaciente(paciente: Paciente) {
    const dialogRef = this.dialog.open(EditarPaciente,{
      width: '60vw',
      data: paciente
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPacientes();
    });
    
    // Lógica para editar um paciente existente
    console.log(`Editar paciente com ID: ${paciente.id}`); 
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1; // MatPaginator é 0-index
    this.limit = event.pageSize;
    this.listarPacientes();
  }

}
