import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Marco circular reutilizable para fotografías del equipo.
 * Mientras no exista una fotografía real (`photoUrl`), muestra un placeholder
 * consistente con la marca (iniciales sobre degradado) en vez de inventar o
 * usar una imagen genérica — ver docs/decisions.md D-006 (fotografías pendientes).
 */
@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white shadow-card dark:ring-brand-navy"
      [class.h-10]="size === 'sm'"
      [class.w-10]="size === 'sm'"
      [class.h-16]="size === 'md'"
      [class.w-16]="size === 'md'"
      [class.h-24]="size === 'lg'"
      [class.w-24]="size === 'lg'"
      [class.h-32]="size === 'xl'"
      [class.w-32]="size === 'xl'"
    >
      <img
        *ngIf="photoUrl; else placeholder"
        [src]="photoUrl"
        [alt]="'Fotografía de ' + name"
        class="h-full w-full object-cover"
      />
      <ng-template #placeholder>
        <div
          class="flex h-full w-full items-center justify-center bg-brand-gradient font-heading font-semibold text-white"
          [class.text-xs]="size === 'sm'"
          [class.text-lg]="size === 'md'"
          [class.text-2xl]="size === 'lg' || size === 'xl'"
          [attr.aria-label]="'Fotografía de ' + name + ' pendiente de cargar'"
          role="img"
        >
          {{ initials }}
        </div>
      </ng-template>
    </div>
  `,
})
export class AvatarComponent {
  @Input({ required: true }) name = '';
  @Input() photoUrl?: string;
  @Input() size: AvatarSize = 'md';

  get initials(): string {
    return this.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }
}
