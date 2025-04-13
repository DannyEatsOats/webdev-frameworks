import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuildService } from '../../services/build.service';
import { Product } from '../../models/product.model';
import { ProductType } from '../../models/product-type';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent {
  ProductType = ProductType;

  constructor(public buildService: BuildService) { }

  build1 = {
    name: 'Build 1',
    selected: this.createEmptyBuild()
  };

  build2 = {
    name: 'Build 2',
    selected: this.createEmptyBuild()
  };

  // Create an empty build template with dynamic ProductType keys
  createEmptyBuild() {
    return {
      [ProductType.CPU]: null,
      [ProductType.GPU]: null,
      [ProductType.RAM]: null,
      [ProductType.MOTHERBOARD]: null,
      [ProductType.CASE]: null,
      [ProductType.STORAGE]: null // Add STORAGE as well
    };
  }

  getProductsByType(type: ProductType): Product[] {
    return this.buildService.getProducts().filter(p => p.category === type);
  }

  // Calculate total price for a build
  calculateTotalPrice(build: any): number {
    let total = 0;
    for (const productType in build.selected) {
      if (build.selected[productType]) {
        total += build.selected[productType].price;
      }
    }
    return total;
  }
}

