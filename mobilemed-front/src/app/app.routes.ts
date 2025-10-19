import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'exames',
        loadChildren: () => import('./pages/exames/exames-module').then(m => m.ExamesModule)
    },
    {
        path: 'pacientes',
        loadChildren: () => import('./pages/paciente/paciente-module').then(m => m.PacienteModule)
    },
    {
        path: '',
        redirectTo: 'pacientes',
        pathMatch: 'full'
    }
];
