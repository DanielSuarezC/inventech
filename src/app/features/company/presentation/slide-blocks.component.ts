import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { SlideBlock } from '../../../core/models/presentation.model';
import { AvatarComponent } from '../../../shared/ui/avatar/avatar.component';

@Component({
  selector: 'app-slide-blocks',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './slide-blocks.component.html',
})
export class SlideBlocksComponent {
  @Input({ required: true }) blocks: SlideBlock[] = [];
  readonly expandedAccordions = signal<Set<string>>(new Set());

  toggleAccordion(id: string): void {
    const expanded = new Set(this.expandedAccordions());
    if (expanded.has(id)) {
      expanded.delete(id);
    } else {
      expanded.add(id);
    }
    this.expandedAccordions.set(expanded);
  }

  isAccordionExpanded(id: string): boolean {
    return this.expandedAccordions().has(id);
  }
}
