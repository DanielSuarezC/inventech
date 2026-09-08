export type SlideBlockType = 'text' | 'cards' | 'list' | 'table' | 'swot' | 'orgchart' | 'stats' | 'gallery' | 'accordion';

export interface SlideBlock {
  type: SlideBlockType;
  content: unknown;
}

export interface PresentationSlide {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  blocks: SlideBlock[];
}
