import { Component } from '@angular/core';
import {  } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
  ],
})

export class HeroesComponent {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
    superpower: 'Flying',
  };
}