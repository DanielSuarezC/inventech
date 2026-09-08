import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-loading',
  standalone: true,
  template: `
    <div class="flex items-center justify-center gap-3 py-10 text-brand-gray" role="status" aria-live="polite">
      <span class="h-5 w-5 animate-spin rounded-full border-2 border-brand-blue border-t-transparent" aria-hidden="true"></span>
      <span class="text-sm">{{ label }}</span>
    </div>
  `,
})
export class LoadingComponent {
  @Input() label = 'Cargando...';
}
