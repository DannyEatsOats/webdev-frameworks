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
  sliderValue = 2500;
  products: Product[] = [];

  constructor(private productService: ProductService, private buildService: BuildService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log('Loaded products from Firestore:', this.products);
    });
  }

  addToBuild(product: Product) {
    this.buildService.addProduct(product);
    console.log('Added to build:', product);
  }
}

