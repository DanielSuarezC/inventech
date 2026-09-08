import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-control px-2.5 py-2 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy/5 dark:text-white dark:hover:bg-white/10"
      [attr.aria-pressed]="theme.theme() === 'dark'"
      [attr.aria-label]="theme.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      (click)="theme.toggle()"
    >
      <span aria-hidden="true">{{ theme.theme() === 'dark' ? '🌙' : '☀️' }}</span>
      <span class="hidden sm:inline">{{ theme.theme() === 'dark' ? 'Oscuro' : 'Claro' }}</span>
    </button>
  `,
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
}
