import { ProductType } from "./product-type";
import { Product } from "./product.model";

export class CPU implements Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public available: boolean = true,
    public imageUrl?: string,
    public category: ProductType = ProductType.CPU,
    public cores: number = 4,
    public clockSpeedGhz: number = 3.5
  ) { }

  getDisplayName(): string {
    return `${this.name} - ${this.cores} Cores @ ${this.clockSpeedGhz}GHz`;
  }

  getPriceWithCurrency(currency: string = '$'): string {
    return `${currency}${this.price.toFixed(2)}`;
  }
}
