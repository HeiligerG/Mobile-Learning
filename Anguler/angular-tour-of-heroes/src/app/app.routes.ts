import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { InfoComponent } from './info/info.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'info', component: InfoComponent },
  { path: 'home', redirectTo: '/'},
   // Wildcard route for 404
  { path: '**', redirectTo: '/heroes' }
];