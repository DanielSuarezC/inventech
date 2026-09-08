import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { CartLine, Sale, SaleItem } from '../models/sale.model';

export interface SaleResult {
  sale: Sale;
  items: SaleItem[];
}

@Injectable({ providedIn: 'root' })
export class SalesService {
  constructor(private readonly supabase: SupabaseService) {}

  /**
   * Crea la venta completa (venta + ítems + descuento de stock) mediante la
   * función SQL `create_sale` para garantizar atomicidad: si el stock no
   * alcanza para alguna línea, toda la venta se revierte.
   */
  async createSale(items: CartLine[], paymentMethod: string): Promise<SaleResult> {
    const payload = items.map((line) => ({
      product_id: line.product_id,
      quantity: line.quantity,
      unit_price: line.unit_price,
    }));

    const { data, error } = await this.supabase.client.rpc('create_sale', {
      p_items: payload,
      p_payment_method: paymentMethod,
    });

    if (error) throw error;
    return data as SaleResult;
  }

  async listRecent(limit = 20): Promise<Sale[]> {
    const { data, error } = await this.supabase.client
      .from('sales')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Sale[];
  }

  async summary(): Promise<{ totalSales: number; totalRevenue: number }> {
    const { data, error } = await this.supabase.client.from('sales').select('total');
    if (error) throw error;
    const sales = data as { total: number }[];
    return {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum, sale) => sum + Number(sale.total), 0),
    };
  }
}
