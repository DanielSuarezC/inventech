import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div class="rounded-card border border-brand-navy/10 bg-white p-6 shadow-card">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
