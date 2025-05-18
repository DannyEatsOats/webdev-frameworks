import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuildService } from '../../services/build.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../shared/service/products.service';
import { ProductType } from '../../models/product-type';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  ProductType = ProductType;
  userBuilds: any[] = []; // List of builds for the logged-in user
  availableProducts: { [key in ProductType]: Product[] } = {
    [ProductType.CPU]: [],
    [ProductType.GPU]: [],
    [ProductType.CASE]: [],
    [ProductType.RAM]: [],
    [ProductType.MOTHERBOARD]: [],
    [ProductType.STORAGE]: []
  };
  constructor(public buildService: BuildService, private productService: ProductService) { }

  build1 = { name: 'Build 1', selected: this.createEmptyBuild() };
  build2 = { name: 'Build 2', selected: this.createEmptyBuild() };

  ngOnInit(): void {
    this.loadUserBuilds();
    //this.loadProductsByCategory();
  }

  createEmptyBuild(): { [key in ProductType]: Product | null } {
    return {
      [ProductType.CPU]: null,
      [ProductType.GPU]: null,
      [ProductType.RAM]: null,
      [ProductType.MOTHERBOARD]: null,
      [ProductType.CASE]: null,
      [ProductType.STORAGE]: null
    };
  }

  async loadUserBuilds() {
    this.userBuilds = await this.buildService.getUserBuilds();
  }

  async loadProductsByCategory() {
    const productFetchPromises = Object.values(ProductType).map(async (type) => {
      this.availableProducts[type] = await this.getProductsByType(type);
    });

    await Promise.all(productFetchPromises);
  }

  async getProductsByType(type: ProductType): Promise<Product[]> {
    return new Promise((resolve) => {
      this.productService.getProducts().subscribe(products => {
        resolve(products.filter(p => p.category === type));
      });
    });
  }

  async loadBuild(event: Event, targetBuild: any) {
    const target = event.target as HTMLSelectElement;
    const buildId = target?.value;

    if (!buildId || !targetBuild) {
      console.warn('Invalid build selection.');
      return;
    }

    const selectedBuild = this.userBuilds.find(build => build.name === buildId);
    if (!selectedBuild) {
      console.warn('Build not found.');
      return;
    }

    targetBuild.name = selectedBuild.name;

    for (const type in selectedBuild.components) {
      if (selectedBuild.components[type]) {
        const product = await this.productService.getProductById(selectedBuild.components[type]);
        if (product) {
          targetBuild.selected[type] = product; // Ensures the product is selected in the dropdown
          switch (product.category) {
            case ProductType.CPU:
              this.availableProducts.CPU = [product];
              break;
            case ProductType.GPU:
              this.availableProducts.GPU = [product];
              break;
            case ProductType.RAM:
              this.availableProducts.RAM = [product];
              break;
            case ProductType.CASE:
              this.availableProducts.CASE = [product];
              break;
            case ProductType.STORAGE:
              this.availableProducts.STORAGE = [product];
              break;
            case ProductType.MOTHERBOARD:
              this.availableProducts.MOTHERBOARD = [product];
              break;

            default:
              break;
          }
        }
      }
    }
  }
  calculateTotalPrice(build: { selected: { [key in ProductType]: Product | null } }): number {
    return Object.values(build.selected)
      .filter((product): product is Product => product !== null)
      .reduce((total, product) => total + (product?.price ?? 0), 0);
  }

  async saveBuild(build: any) {
    for (var item in build.selected) {
      console.log(item + " " + build.selected[item]);
      if (build.selected[item] === null && item !== ProductType.STORAGE) {
        alert('Not all slots are filled in the build');
        return;
      }
    }
    const success = await this.buildService.saveBuild(build);
    if (!success) {
      alert('Build name already exists. Please choose a different name.');
    }
  }
}

