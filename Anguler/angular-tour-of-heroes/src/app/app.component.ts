import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

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
    RouterOutlet,
    CommonModule, 
    FormsModule,
    HeroesComponent,
    MessagesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  readonly title = 'Angular Component Manager';
  
  // Signals für reaktive Daten
  components = signal<ComponentItem[]>([
    {
      id: 1,
      name: 'Heroes Component',
      selector: 'app-heroes',
      description: 'Zeigt eine Liste von Helden an mit CRUD-Funktionalität',
      status: 'completed',
      isDisplayed: false,
      createdAt: new Date('2025-01-15T10:30:00')
    },
    {
      id: 2,
      name: 'Detail Hero Component',
      selector: 'app-hero-detail',
      description: 'Zeigt detailierte Ansicht an',
      status: 'completed',
      isDisplayed: false,
      createdAt: new Date('2025-01-15T10:30:00')
    },
  ]);

  currentFilter = signal<FilterType>('all');
  newComponentName = signal('');
  
  private nextId = signal(3);

  // Computed Properties
  filteredComponents = computed(() => {
    const filter = this.currentFilter();
    const allComponents = this.components();
    
    if (filter === 'all') {
      return allComponents;
    }
    return allComponents.filter(component => component.status === filter);
  });

  completedCount = computed(() => 
    this.components().filter(c => c.status === 'completed').length
  );

  inProgressCount = computed(() => 
    this.components().filter(c => c.status === 'inProgress').length
  );

  plannedCount = computed(() => 
    this.components().filter(c => c.status === 'planned').length
  );

  // Component Management
  toggleComponentDisplay(component: ComponentItem): void {
    this.components.update(components => 
      components.map(c => ({
        ...c,
        isDisplayed: c.id === component.id ? !c.isDisplayed : false
      }))
    );
  }

  cycleStatus(component: ComponentItem): void {
    const statusOrder: ComponentItem['status'][] = ['planned', 'inProgress', 'completed'];
    const currentIndex = statusOrder.indexOf(component.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    
    this.components.update(components =>
      components.map(c => 
        c.id === component.id 
          ? { ...c, status: statusOrder[nextIndex] }
          : c
      )
    );
  }

  addQuickComponent(): void {
    const name = this.newComponentName().trim();
    if (!name) return;

    const selector = `app-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const newComponent: ComponentItem = {
      id: this.nextId(),
      name: `${name} Component`,
      selector: selector,
      description: `${name} Component - Beschreibung hinzufügen`,
      status: 'planned',
      isDisplayed: false,
      createdAt: new Date()
    };

    this.components.update(components => [newComponent, ...components]);
    this.nextId.update(id => id + 1);
    this.newComponentName.set('');
  }

  // Filtering
  setFilter(filter: FilterType): void {
    this.currentFilter.set(filter);
  }

  // Utilities
  trackByComponentId(index: number, component: ComponentItem): number {
    return component.id;
  }

  getStatusLabel(status: string): string {
    const labels = {
      'completed': 'Fertig',
      'inProgress': 'In Arbeit',
      'planned': 'Geplant'
    };
    return labels[status as keyof typeof labels] || status;
  }

  isComponentImplemented(selector: string): boolean {
    const implementedComponents = [
      'app-heroes',
      'app-hero-detail',
      'app-messages',
      'app-info'
    ];
    
    return implementedComponents.includes(selector);
  }
}