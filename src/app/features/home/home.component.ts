import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY_SLOGAN, MISSION, VISION, MAIN_PARTNERS } from '../../core/data/company.data';
import { CATALOG_PRODUCTS, FULL_PLAN_PRICE_LABEL } from '../../core/data/catalog.data';
import { CONTACT_EMAIL, CONTACT_WEBSITE, SOCIAL_CHANNELS } from '../../core/data/contact.data';
import { CardComponent } from '../../shared/ui/card/card.component';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent, AvatarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly slogan = COMPANY_SLOGAN;
  readonly missionExcerpt = MISSION.split('\n\n')[0];
  readonly visionExcerpt = VISION.split('\n\n')[0];
  readonly products = CATALOG_PRODUCTS;
  readonly fullPlanPrice = FULL_PLAN_PRICE_LABEL;
  readonly partners = MAIN_PARTNERS;
  readonly contactEmail = CONTACT_EMAIL;
  readonly website = CONTACT_WEBSITE;
  readonly socials = SOCIAL_CHANNELS;
}
