import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p class="font-heading text-6xl font-bold text-brand-blue">404</p>
      <h1 class="mt-4 font-heading text-xl font-semibold text-brand-navy">Página no encontrada</h1>
      <p class="mt-2 text-sm text-brand-gray">La página que buscas no existe o fue movida.</p>
      <a routerLink="/" class="mt-6 rounded-control bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90">
        Volver al inicio
      </a>
    </section>
  `,
})
export class NotFoundComponent {}
