import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { RegulationDocument } from '../models/regulation-document.model';

interface DocumentRow {
  id: string;
  title: string;
  category: string;
  description: string | null;
  url: string;
  published_at: string;
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

    return (data as DocumentRow[]).map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      description: row.description ?? '',
      url: row.url,
      publishedAt: row.published_at,
    }));
  }
}
