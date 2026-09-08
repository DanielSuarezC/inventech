import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATALOG_PRODUCTS } from '../../core/data/catalog.data';
import { CardComponent } from '../../shared/ui/card/card.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent, BadgeComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  readonly products = CATALOG_PRODUCTS;

  dependencyLabel(dependsOn?: string): string {
    if (!dependsOn) return '';
    const parent = this.products.find((p) => p.id === dependsOn);
    return parent ? parent.name : '';
  }
}
