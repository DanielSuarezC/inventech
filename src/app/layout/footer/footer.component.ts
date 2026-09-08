import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { COMPANY_SLOGAN } from '../../core/data/company.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly slogan = COMPANY_SLOGAN;
  readonly year = new Date().getFullYear();
}
