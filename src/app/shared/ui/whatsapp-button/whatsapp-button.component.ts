import { Component } from '@angular/core';
import { buildWhatsappLink } from '../../../core/config/whatsapp.config';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a
      [href]="link"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6"
      aria-label="Escribir a INVENTECH por WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path
          d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.96 9.96 0 0 0 4.88 1.24h.01c5.52 0 10-4.48 10-10s-4.48-9.89-10.01-9.89ZM12.05 20a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-3.06.8.82-2.98-.2-.31A8.26 8.26 0 0 1 3.75 12c0-4.56 3.72-8.27 8.3-8.27 4.57 0 8.29 3.7 8.29 8.27 0 4.56-3.72 8-8.29 8Zm4.53-6.19c-.25-.13-1.47-.72-1.7-.8-.23-.08-.4-.13-.56.13-.17.25-.65.8-.79.97-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.77-1.86-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09 0 1.23.9 2.42 1.02 2.59.13.17 1.77 2.71 4.29 3.8.6.26 1.07.42 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.3Z"
        />
      </svg>
    </a>
  `,
})
export class WhatsappButtonComponent {
  readonly link = buildWhatsappLink();
}
