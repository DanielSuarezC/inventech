import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Category } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(): Promise<Category[]> {
    const { data, error } = await this.supabase.client
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data as Category[];
  }

  async create(name: string, description: string | null): Promise<Category> {
    const { data: userData } = await this.supabase.client.auth.getUser();
    const { data, error } = await this.supabase.client
      .from('categories')
      .insert({ name, description, created_by: userData.user?.id })
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('categories').delete().eq('id', id);
    if (error) throw error;
  }
}
