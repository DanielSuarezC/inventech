import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { ThemeToggleComponent } from '../../shared/ui/theme-toggle/theme-toggle.component';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly menuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Inicio', path: '/' },
    { label: 'InvenTech', path: '/inventech' },
    { label: 'Productos', path: '/productos' },
    { label: 'Aplicativos', path: '/aplicativos' },
    { label: 'Normatividad', path: '/normatividad' },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
