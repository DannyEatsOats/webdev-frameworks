
import { ProductType } from './product-type';
import { Product } from './product.model';

export class Case implements Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public available: boolean = true,
    public imageUrl?: string,
    public category: ProductType = ProductType.CASE,
    public formFactor: string = 'Mid Tower',
    public supportedMotherboards: string[] = ['ATX', 'Micro-ATX', 'Mini-ITX'],
    public driveBays: { '5.25"': number; '3.5"': number; '2.5"': number } = { '5.25"': 2, '3.5"': 4, '2.5"': 2 },
    public expansionSlots: number = 7,
    public maxGpuLengthMm: number = 330,
    public material: string = 'Steel',
    public dimensionsMm: { height: number; width: number; depth: number } = { height: 450, width: 200, depth: 400 }
  ) { }

  getDisplayName(): string {
    return `${this.name} (${this.formFactor})`;
  }

  getPriceWithCurrency(currency: string = '$'): string {
    return `${currency}${this.price.toFixed(2)}`;
  }
}
