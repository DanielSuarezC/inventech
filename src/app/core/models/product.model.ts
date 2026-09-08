export interface CatalogProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  referencePrice: string;
  priceUnit: string;
  features: string[];
  dependsOn?: string;
  standalone: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string | null;
  description: string | null;
  category_id: string | null;
  cost_price: number;
  sale_price: number;
  track_inventory: boolean;
  stock: number;
  min_stock: number;
  created_by: string;
  created_at: string;
}
