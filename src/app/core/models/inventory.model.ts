export type MovementType = 'in' | 'out' | 'adjustment';

export interface InventoryMovement {
  id: string;
  product_id: string;
  type: MovementType;
  quantity: number;
  stock_after: number;
  source: 'manual' | 'pos_sale' | 'scanner';
  notes: string | null;
  created_by: string;
  created_at: string;
}
