import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { loadingService } from '../../../services/loading/loading-service';
import { Exame } from '../../../common/interfaces/exame';

@Component({
  selector: 'app-lista-exames',
  imports: [
    MatTableModule, MatPaginator, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatIconModule, MatProgressSpinnerModule
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
    'acoes'
  ];

  total = 0;
  limit = 10;
  page = 1;

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _loading: loadingService,
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
    this._loading.show();
    this.exameService.getExames(this.page, this.limit).subscribe((resp:any) => {
      this.total = resp.total;
      this.dataSource.data = resp.data;
      this._loading.hide();
    });
  }

  adicionarExame() {
    const dialogRef = this.dialog.open(AddExame,{
      width: '70vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
    });

    console.log('Adicionar novo paciente');
  }

  apagarExame(exame:Exame) {
    const dialogRef = this.dialog.open(ApagaExame,{
      width: '60vw',
      data: exame
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
    });
    
    console.log(`Apagar paciente com ID: ${exame.id}`);
  }

  editarExame(exame:Exame) {
    const dialogRef = this.dialog.open(UpdateExame,{
      width: '60vw',
      data: exame
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
    });
    
    // Lógica para editar um paciente existente
    console.log(`Editar paciente com ID: ${exame.id}`); 
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1; // MatPaginator é 0-index
    this.limit = event.pageSize;
    this.listarExames();
  }
}
