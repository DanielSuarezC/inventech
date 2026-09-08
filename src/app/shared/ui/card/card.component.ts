import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div class="rounded-card border border-brand-navy/10 bg-white p-6 shadow-card transition-colors dark:border-white/10 dark:bg-[#0e2740] dark:shadow-none">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
