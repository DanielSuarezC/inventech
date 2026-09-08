import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="inline-flex items-center gap-2">
      <img 
        src="assets/logo_black.png" 
        alt="InvenTech Logo" 
        class="object-contain w-auto"
        [class.h-8]="size === 'md'"
        [class.h-12]="size === 'lg'"
      />
    </div>
  `,
})
export class LogoComponent {
  @Input() size: 'md' | 'lg' = 'md';
}