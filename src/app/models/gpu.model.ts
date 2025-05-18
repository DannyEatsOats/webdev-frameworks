import { Product } from './product.model';
import { ProductType } from './product-type';

export class GPU implements Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public available: boolean,
    public imageUrl: string,
    public category: ProductType = ProductType.GPU,
  ) { }

  getDisplayName(): string {
    return this.name;
  }

  getPriceWithCurrency(): string {
    return `$${this.price.toFixed(2)}`;
  }
}
