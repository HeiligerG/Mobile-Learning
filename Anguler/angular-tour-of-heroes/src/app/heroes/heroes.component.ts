import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Hero } from '../hero';
import { MessageService } from '../services/message.service';
import { HeroService } from '../services/hero.service';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeroDetailComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes = signal<Hero[]>([]);
  selectedHero = signal<Hero | undefined>(undefined);
  
  hero: Hero = {
    id: 0,
    name: '',
    superpower: '',
  };

  hasHeroes = computed(() => this.heroes().length > 0);
  heroCount = computed(() => this.heroes().length);

  private heroService = inject(HeroService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes.set(heroes);
    });
  }

  onSelect(hero: Hero): void {
    this.selectedHero.set(hero);
    this.messageService.add(`Selected hero: ${hero.name}`);
  }

  isSelected(hero: Hero): boolean {
    return this.selectedHero()?.id === hero.id;
  }

  addHero(): void {
    if (this.hero.name.trim()) {
      const newHero: Hero = {
        id: this.getNextId(),
        name: this.hero.name.trim(),
        superpower: this.hero.superpower || 'Unknown'
      };
      
      this.heroes.update(heroes => [...heroes, newHero]);
      this.hero = { id: 0, name: '', superpower: '' };
      this.messageService.add(`Added hero: ${newHero.name}`);
    }
  }

  private getNextId(): number {
    const maxId = Math.max(...this.heroes().map(h => h.id), 0);
    return maxId + 1;
  }

  trackByHeroId(index: number, hero: Hero): number {
    return hero.id;
  }
}