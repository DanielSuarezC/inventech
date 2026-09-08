import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PresentationEngineComponent } from './presentation/presentation-engine.component';
import { SlideBlocksComponent } from './presentation/slide-blocks.component';
import { COMPANY_PRESENTATION_SLIDES } from '../../core/data/presentation.data';
import { COMPANY_SLOGAN } from '../../core/data/company.data';

type ViewMode = 'presentacion' | 'documento';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, PresentationEngineComponent, SlideBlocksComponent],
  templateUrl: './company.component.html',
})
export class CompanyComponent {
  readonly slides = COMPANY_PRESENTATION_SLIDES;
  readonly slogan = COMPANY_SLOGAN;
  readonly viewMode = signal<ViewMode>('presentacion');

  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }
}
