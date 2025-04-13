import { ProductType } from './product-type';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  imageUrl?: string;
  category: ProductType;

  getDisplayName(): string;
  getPriceWithCurrency(currency?: string): string;
}

