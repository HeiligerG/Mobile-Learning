import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'heroes',
        loadComponent: () =>
          import('../tabs/heroes-tab/heroes-tab.page').then((m) => m.HeroesPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../tabs/settings-tab/settings-tab.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/heroes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/heroes',
    pathMatch: 'full',
  },
];
