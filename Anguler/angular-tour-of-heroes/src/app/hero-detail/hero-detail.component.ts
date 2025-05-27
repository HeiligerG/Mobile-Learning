import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {
  hero = input<Hero>();
  
  heroName = computed(() => this.hero()?.name?.toUpperCase() || '');
  
  onHeroNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const currentHero = this.hero();
    if (currentHero && input) {
      currentHero.name = input.value;
    }
  }
}