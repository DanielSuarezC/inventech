import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { InventoryMovement, MovementType } from '../models/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryMovementsService {
  constructor(private readonly supabase: SupabaseService) {}

  async listByProduct(productId: string): Promise<InventoryMovement[]> {
    const { data, error } = await this.supabase.client
      .from('inventory_movements')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as InventoryMovement[];
  }

  async listRecent(limit = 20): Promise<InventoryMovement[]> {
    const { data, error } = await this.supabase.client
      .from('inventory_movements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as InventoryMovement[];
  }

  /**
   * Registra un movimiento y actualiza el stock del producto de forma atómica
   * mediante la función SQL `register_inventory_movement` (ver
   * supabase/schema.sql), evitando condiciones de carrera entre lectura y
   * escritura del stock que ocurrirían haciendo esto en dos pasos desde el
   * cliente.
   */
  async registerMovement(
    productId: string,
    type: MovementType,
    quantity: number,
    source: InventoryMovement['source'],
    notes: string | null
  ): Promise<void> {
    const { error } = await this.supabase.client.rpc('register_inventory_movement', {
      p_product_id: productId,
      p_type: type,
      p_quantity: quantity,
      p_source: source,
      p_notes: notes,
    });

    if (error) throw error;
  }
}
