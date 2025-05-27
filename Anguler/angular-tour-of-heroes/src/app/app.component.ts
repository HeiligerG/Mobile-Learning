import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes/heroes.component';

interface ComponentItem {
  id: number;
  name: string;
  selector: string;
  description: string;
  status: 'planned' | 'inProgress' | 'completed';
  isDisplayed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'planned' | 'inProgress' | 'completed';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    HeroesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Angular Component Manager';
  
  components: ComponentItem[] = [
    {
      id: 1,
      name: 'Heroes Component',
      selector: 'app-heroes',
      description: 'Zeigt eine Liste von Helden an mit CRUD-Funktionalität',
      status: 'completed',
      isDisplayed: false,
      createdAt: new Date('2025-01-15T10:30:00')
    },
  ];

  currentFilter: FilterType = 'all';
  newComponentName = '';
  
  private nextId = 5;

  // Component Management
  toggleComponentDisplay(component: ComponentItem): void {
    // Schließe alle anderen Components
    this.components.forEach(c => {
      if (c.id !== component.id) {
        c.isDisplayed = false;
      }
    });
    
    // Toggle das ausgewählte Component
    component.isDisplayed = !component.isDisplayed;
  }

  cycleStatus(component: ComponentItem): void {
    const statusOrder: ComponentItem['status'][] = ['planned', 'inProgress', 'completed'];
    const currentIndex = statusOrder.indexOf(component.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    component.status = statusOrder[nextIndex];
  }

  addQuickComponent(): void {
    if (!this.newComponentName.trim()) return;

    const name = this.newComponentName.trim();
    const selector = `app-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const newComponent: ComponentItem = {
      id: this.nextId++,
      name: `${name} Component`,
      selector: selector,
      description: `${name} Component - Beschreibung hinzufügen`,
      status: 'planned',
      isDisplayed: false,
      createdAt: new Date()
    };

    this.components.unshift(newComponent);
    this.newComponentName = '';
  }

  // Filtering
  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }

  getFilteredComponents(): ComponentItem[] {
    if (this.currentFilter === 'all') {
      return this.components;
    }
    return this.components.filter(component => component.status === this.currentFilter);
  }

  // Statistics
  getCompletedCount(): number {
    return this.components.filter(c => c.status === 'completed').length;
  }

  getInProgressCount(): number {
    return this.components.filter(c => c.status === 'inProgress').length;
  }

  getPlannedCount(): number {
    return this.components.filter(c => c.status === 'planned').length;
  }

  // Utilities
  trackByComponentId(index: number, component: ComponentItem): number {
    return component.id;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'completed': return 'Fertig';
      case 'inProgress': return 'In Arbeit';
      case 'planned': return 'Geplant';
      default: return status;
    }
  }

  isComponentImplemented(selector: string): boolean {
    // Hier definierst du, welche Components bereits implementiert sind
    const implementedComponents = [
      'app-heroes',
      // Füge hier weitere implementierte Components hinzu
    ];
    
    return implementedComponents.includes(selector);
  }
}