import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type BadgeTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span [class]="classes"><ng-content></ng-content></span>`,
})
export class BadgeComponent {
  @Input() tone: BadgeTone = 'neutral';

  private readonly tones: Record<BadgeTone, string> = {
    success: 'bg-brand-green/10 text-brand-green',
    info: 'bg-brand-blue/10 text-brand-blue',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    neutral: 'bg-brand-gray/10 text-brand-gray',
  };

  get classes(): string {
    return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${this.tones[this.tone]}`;
  }
}
