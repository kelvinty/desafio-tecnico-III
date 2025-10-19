import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Exames } from './exames';
import { ListaExames } from './lista-exames/lista-exames';

const routes: Routes = [
  {
      path: '',
      component: Exames,
      children: [
        {
          path: 'lista-exames',
          component: ListaExames
        },
        {
          path: '',
          redirectTo: 'lista-exames',
          pathMatch: 'full'
        }
      ]
    },
  
    {
      path: '',
      redirectTo: 'exame',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamesRoutingModule { }
