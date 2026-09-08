import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-brand-navy/20 py-12 text-center">
      <p class="font-heading text-lg font-semibold text-brand-navy">{{ title }}</p>
      <p class="max-w-sm text-sm text-brand-gray">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() title = 'Sin resultados';
  @Input() description = 'No hay información para mostrar todavía.';
}
