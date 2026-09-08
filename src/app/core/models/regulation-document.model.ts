export interface RegulationDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  publishedAt: string;
  documentType?: string;
  version?: string;
  author?: string;
  status: 'borrador' | 'publicado' | 'archivado';
  tags: string[];
}

export interface DocumentCategory {
  id: string;
  name: string;
}
