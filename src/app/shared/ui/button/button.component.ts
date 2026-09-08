import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="classes"
    >
      <span *ngIf="loading" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span>
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;

  private readonly base =
    'inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

  private readonly variants: Record<ButtonVariant, string> = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue/90 focus-visible:outline-brand-blue',
    secondary: 'bg-brand-green text-white hover:bg-brand-green/90 focus-visible:outline-brand-green',
    ghost: 'bg-transparent text-brand-navy hover:bg-brand-navy/5 focus-visible:outline-brand-navy',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600',
  };

  private readonly sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  get classes(): string {
    return `${this.base} ${this.variants[this.variant]} ${this.sizes[this.size]}`;
  }
}
