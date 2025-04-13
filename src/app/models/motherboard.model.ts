import { ProductType } from './product-type';
import { Product } from './product.model';

export class Motherboard implements Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public available: boolean = true,
    public imageUrl?: string,
    public category: ProductType = ProductType.MOTHERBOARD,
    public socketType: string = 'AM4',
    public formFactor: string = 'ATX',
    public chipset: string = 'B550',
    public supportedMemoryType: string = 'DDR4',
    public memorySlots: number = 4,
    public maxMemory: number = 128, // in GB
    public pcieSlots: number = 3,
    public storageInterfaces: string[] = ['SATA', 'M.2'],
    public usbPorts: number = 8,
    public lanSpeed: string = '1Gbps'
  ) { }

  getDisplayName(): string {
    return `${this.name} (${this.formFactor}, ${this.socketType})`;
  }

  getPriceWithCurrency(currency: string = '$'): string {
    return `${currency}${this.price.toFixed(2)}`;
  }
}

