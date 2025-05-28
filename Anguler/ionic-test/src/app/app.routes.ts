import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab-router/tabs.routes').then((m) => m.routes),
  },
];
