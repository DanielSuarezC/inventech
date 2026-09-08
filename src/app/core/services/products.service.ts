import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Product } from '../models/product.model';

export interface ProductInput {
  name: string;
  sku: string | null;
  description: string | null;
  category_id: string | null;
  cost_price: number;
  sale_price: number;
  track_inventory: boolean;
  stock: number;
  min_stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(search = ''): Promise<Product[]> {
    let query = this.supabase.client.from('products').select('*').order('name', { ascending: true });

    if (search.trim()) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Product[];
  }

  async findByBarcode(sku: string): Promise<Product | null> {
    const { data, error } = await this.supabase.client
      .from('products')
      .select('*')
      .eq('sku', sku)
      .maybeSingle();

    if (error) throw error;
    return data as Product | null;
  }

  async create(input: ProductInput): Promise<Product> {
    const { data: userData } = await this.supabase.client.auth.getUser();
    const { data, error } = await this.supabase.client
      .from('products')
      .insert({ ...input, created_by: userData.user?.id })
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  }

  async update(id: string, input: Partial<ProductInput>): Promise<Product> {
    const { data, error } = await this.supabase.client
      .from('products')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('products').delete().eq('id', id);
    if (error) throw error;
  }

  async adjustStock(id: string, newStock: number): Promise<void> {
    const { error } = await this.supabase.client.from('products').update({ stock: newStock }).eq('id', id);
    if (error) throw error;
  }
}
