// src/app/services/build.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  private selectedProducts: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  addProduct(product: Product) {
    this.selectedProducts.push(product);
    this.productsSubject.next(this.selectedProducts);
  }

  getProducts(): Product[] {
    return this.selectedProducts;
  }

  removeProduct(id: string) {
    this.selectedProducts = this.selectedProducts.filter(p => p.id !== id);
    this.productsSubject.next(this.selectedProducts);
  }

  clear() {
    this.selectedProducts = [];
    this.productsSubject.next(this.selectedProducts);
  }
}

