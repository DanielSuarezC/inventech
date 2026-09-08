import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SlideBlock } from '../../../core/models/presentation.model';

@Component({
  selector: 'app-slide-blocks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-blocks.component.html',
})
export class SlideBlocksComponent {
  @Input({ required: true }) blocks: SlideBlock[] = [];
}
