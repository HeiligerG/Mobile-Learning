import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
    path: 'info',
    loadComponent: () => 
        import('./info/info.component').then(m => m.InfoComponent)
    },
];
