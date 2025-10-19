import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddExame } from '../add-exame/add-exame';
import { ApagaExame } from '../apaga-exame/apaga-exame';
import { UpdateExame } from '../update-exame/update-exame';
import { ExameService } from '../../../services/exame/exame-service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-exames',
  imports: [
    MatTableModule, MatPaginator, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatIconModule
  ],
  templateUrl: './lista-exames.html',
  styleUrl: './lista-exames.scss'
})

export class ListaExames {
// pacientes.component.ts
  displayedColumns: string[] = [
    'tipoExame',
    'dataExame',
    'resultado',
    'pacienteNome',
  //   'pacienteDocumento',
  //   'pacienteEmail',
  //   'pacienteTelefone',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private exameService: ExameService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarExames();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarExames() {
    this.exameService.getExames().subscribe((resp:any) => {
      console.log(resp);
      this.dataSource.data = resp;
    });
  }

  adicionarExame() {
    const dialogRef = this.dialog.open(AddExame,{
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
    });

    console.log('Adicionar novo paciente');
  }

  apagarExame(id: number) {
    const dialogRef = this.dialog.open(ApagaExame,{
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
    });
    
    console.log(`Apagar paciente com ID: ${id}`);
  }

  editarExame(id: number) {
    const dialogRef = this.dialog.open(UpdateExame,{
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
    });
    
    // Lógica para editar um paciente existente
    console.log(`Editar paciente com ID: ${id}`); 
  }
}
