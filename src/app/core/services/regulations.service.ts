import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { RegulationDocument, DocumentCategory } from '../models/regulation-document.model';

interface DocumentRow {
  id: string;
  title: string;
  category: string;
  description: string | null;
  url: string;
  published_at: string;
  document_type?: string;
  version?: string;
  author?: string;
  status: 'borrador' | 'publicado' | 'archivado';
  tags: string[];
}

interface CategoryRow {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class RegulationsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(): Promise<RegulationDocument[]> {
    const { data, error } = await this.supabase.client
      .from('documents')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) throw error;

    return (data as DocumentRow[]).map((row) => this.mapDocument(row));
  }

  async listCategories(): Promise<DocumentCategory[]> {
    const { data, error } = await this.supabase.client
      .from('document_categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error cargando categorías:', error);
      return [];
    }
    return (data as CategoryRow[]) ?? [];
  }

  async create(doc: Omit<RegulationDocument, 'id' | 'publishedAt'>): Promise<RegulationDocument> {
    const { data, error } = await this.supabase.client
      .from('documents')
      .insert({
        title: doc.title,
        category: doc.category,
        description: doc.description || null,
        url: doc.url,
        document_type: doc.documentType || null,
        version: doc.version || null,
        author: doc.author || null,
        status: doc.status,
        tags: doc.tags ?? [],
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapDocument(data as DocumentRow);
  }

  async update(
    id: string,
    patch: Partial<Omit<RegulationDocument, 'id' | 'publishedAt'>>
  ): Promise<RegulationDocument> {
    const updateData: Record<string, unknown> = {};
    if (patch.title) updateData['title'] = patch.title;
    if (patch.category) updateData['category'] = patch.category;
    if (patch.description !== undefined) updateData['description'] = patch.description || null;
    if (patch.url) updateData['url'] = patch.url;
    if (patch.documentType !== undefined) updateData['document_type'] = patch.documentType || null;
    if (patch.version !== undefined) updateData['version'] = patch.version || null;
    if (patch.author !== undefined) updateData['author'] = patch.author || null;
    if (patch.status) updateData['status'] = patch.status;
    if (patch.tags) updateData['tags'] = patch.tags;

    const { data, error } = await this.supabase.client
      .from('documents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapDocument(data as DocumentRow);
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('documents').delete().eq('id', id);
    if (error) throw error;
  }

  async createCategory(name: string): Promise<DocumentCategory> {
    const { data, error } = await this.supabase.client
      .from('document_categories')
      .insert({ name })
      .select()
      .single();

    if (error) throw error;
    return data as DocumentCategory;
  }

  private mapDocument(row: DocumentRow): RegulationDocument {
    return {
      id: row.id,
      title: row.title,
      category: row.category,
      description: row.description ?? '',
      url: row.url,
      publishedAt: row.published_at,
      documentType: row.document_type,
      version: row.version,
      author: row.author,
      status: row.status,
      tags: row.tags ?? [],
    };
  }
}
