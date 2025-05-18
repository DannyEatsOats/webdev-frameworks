import { ProductType } from './product-type';
import { Product } from './product.model';

export class RAM implements Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public available: boolean = true,
    public imageUrl?: string,
    public category: ProductType = ProductType.RAM,
    public capacityGB: number = 16,
    public speedMHz: number = 3200,
    public type: string = 'DDR4',
    public modules: number = 2,
    public voltage: number = 1.35
  ) { }

  getDisplayName(): string {
    return `${this.name} ${this.capacityGB}GB (${this.modules}x${this.capacityGB / this.modules}GB) ${this.type} ${this.speedMHz}MHz`;
  }

  getPriceWithCurrency(currency: string = '$'): string {
    return `${currency}${this.price.toFixed(2)}`;
  }
}
