import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { PresentationSlide } from '../../../core/models/presentation.model';
import { SlideBlocksComponent } from './slide-blocks.component';

/**
 * Motor de presentación reutilizable e independiente del contenido.
 * Recibe slides tipadas y provee navegación siguiente/anterior, teclado,
 * indicador de progreso, índice y modo presentación (fullscreen).
 */
@Component({
  selector: 'app-presentation-engine',
  standalone: true,
  imports: [CommonModule, SlideBlocksComponent],
  templateUrl: './presentation-engine.component.html',
})
export class PresentationEngineComponent implements OnChanges {
  @Input({ required: true }) slides: PresentationSlide[] = [];
  @Output() exitPresentationMode = new EventEmitter<void>();

  @ViewChild('stage') stageRef?: ElementRef<HTMLDivElement>;

  readonly currentIndex = signal(0);
  readonly tocOpen = signal(false);
  readonly isFullscreen = signal(false);

  ngOnChanges(): void {
    if (this.currentIndex() >= this.slides.length) {
      this.currentIndex.set(0);
    }
  }

  get currentSlide(): PresentationSlide | undefined {
    return this.slides[this.currentIndex()];
  }

  get progressPercent(): number {
    if (this.slides.length <= 1) return 100;
    return Math.round((this.currentIndex() / (this.slides.length - 1)) * 100);
  }

  next(): void {
    if (this.currentIndex() < this.slides.length - 1) {
      this.currentIndex.update((i) => i + 1);
    }
  }

  previous(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
    }
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex.set(index);
      this.tocOpen.set(false);
    }
  }

  toggleToc(): void {
    this.tocOpen.update((open) => !open);
  }

  async togglePresentationMode(): Promise<void> {
    const el = this.stageRef?.nativeElement;
    if (!el) return;

    if (!document.fullscreenElement) {
      await el.requestFullscreen?.();
      this.isFullscreen.set(true);
    } else {
      await document.exitFullscreen?.();
      this.isFullscreen.set(false);
      this.exitPresentationMode.emit();
    }
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange(): void {
    this.isFullscreen.set(!!document.fullscreenElement);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
      case 'PageDown':
        event.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        event.preventDefault();
        this.previous();
        break;
      case 'Home':
        event.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        event.preventDefault();
        this.goTo(this.slides.length - 1);
        break;
      case 'Escape':
        if (this.isFullscreen()) {
          this.togglePresentationMode();
        } else if (this.tocOpen()) {
          this.tocOpen.set(false);
        }
        break;
    }
  }
}
