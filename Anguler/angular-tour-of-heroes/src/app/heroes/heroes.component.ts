import { Component } from '@angular/core';
import {  } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { HEROES } from '../mock-heroes';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    UpperCasePipe,
  ],
})

export class HeroesComponent {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
    superpower: 'Flying',
  };
  heroes = HEROES;

  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
}
}