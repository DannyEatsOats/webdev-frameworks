import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../shared/service/products.service';
import { BuildService } from '../../services/build.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  minPrice = 0;
  maxPrice = 5000;
  selectedCategories: Set<string> = new Set();
  products: Product[] = [];

  constructor(private productService: ProductService, private buildService: BuildService) { }

  ngOnInit(): void {
    this.loadProducts(); // Default product loading
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  applyFilters(): void {
    this.productService.getFilteredProducts(this.minPrice, this.maxPrice, Array.from(this.selectedCategories))
      .subscribe(products => {
        this.products = products;
      });
  }

  updateFilters(category: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target?.checked !== undefined) {
      if (target.checked) {
        this.selectedCategories.add(category);
      } else {
        this.selectedCategories.delete(category);
      }
    }
  }

  addToBuild(product: Product) {
    this.buildService.addProduct(product);
    alert('Added to build: ' + product.name);
  }
}

