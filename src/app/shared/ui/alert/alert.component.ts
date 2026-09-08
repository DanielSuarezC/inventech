import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type AlertTone = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes" role="alert">
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertComponent {
  @Input() tone: AlertTone = 'info';

  private readonly tones: Record<AlertTone, string> = {
    success: 'border-brand-green/30 bg-brand-green/10 text-brand-green',
    info: 'border-brand-blue/30 bg-brand-blue/10 text-brand-blue',
    warning: 'border-amber-300 bg-amber-50 text-amber-800',
    danger: 'border-red-300 bg-red-50 text-red-700',
  };

  get classes(): string {
    return `rounded-control border px-4 py-3 text-sm ${this.tones[this.tone]}`;
  }
}
