import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY_SLOGAN, MISSION } from '../../core/data/company.data';
import { CATALOG_PRODUCTS } from '../../core/data/catalog.data';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly slogan = COMPANY_SLOGAN;
  readonly missionExcerpt = MISSION.split('\n\n')[0];
  readonly products = CATALOG_PRODUCTS;
}
