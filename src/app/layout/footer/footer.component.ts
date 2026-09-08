import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { COMPANY_SLOGAN } from '../../core/data/company.data';
import { CONTACT_EMAIL, CONTACT_WEBSITE, SOCIAL_CHANNELS } from '../../core/data/contact.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly slogan = COMPANY_SLOGAN;
  readonly year = new Date().getFullYear();
  readonly contactEmail = CONTACT_EMAIL;
  readonly website = CONTACT_WEBSITE;
  readonly socials = SOCIAL_CHANNELS;
}
