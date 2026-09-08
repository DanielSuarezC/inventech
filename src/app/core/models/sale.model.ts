export interface Sale {
  id: string;
  transaction_number: string;
  total: number;
  payment_method: string;
  created_by: string;
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface CartLine {
  product_id: string;
  name: string;
  unit_price: number;
  quantity: number;
  track_inventory: boolean;
  available_stock: number;
}
