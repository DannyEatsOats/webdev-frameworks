import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { CPU } from '../../models/cpu.model';
import { GPU } from '../../models/gpu.model';
import { Motherboard } from '../../models/motherboard.model';
import { RAM } from '../../models/ram.model';
import { Case } from '../../models/case.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) { }

  // Fetch all products from Firestore
  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }).pipe(
      map(products => products.map(product => this.mapProductToClass(product)))
    );
  }

  async getProductById(productId: string): Promise<Product | null> {
    const productRef = doc(this.firestore, `products/${productId}`);
    const productSnapshot = await getDoc(productRef);

    return productSnapshot.exists() ? productSnapshot.data() as Product : null;
  }
  // Fetch products with filtering
  getFilteredProducts(minPrice: number, maxPrice: number, selectedCategories: string[]): Observable<Product[]> {
    if ((!minPrice && !maxPrice && selectedCategories.length === 0)) {
      console.log('zsaaaa');
      return this.getProducts();
    }

    let filters = [];

    if (minPrice) filters.push(where('price', '>=', minPrice));
    if (maxPrice) filters.push(where('price', '<=', maxPrice));

    // Apply category filter only if categories are selected
    if (selectedCategories.length > 0) {
      filters.push(where('category', 'in', selectedCategories));
    }

    const productsRef = query(collection(this.firestore, 'products'), ...filters);

    return collectionData(productsRef, { idField: 'id' }).pipe(
      map(products => products.map(product => this.mapProductToClass(product)))
    );
  }

  private mapProductToClass(productData: any): Product {
    switch (productData.category) {
      case 'CPU':
        return new CPU(
          productData.id,
          productData.name,
          productData.description,
          productData.price,
          productData.available,
          productData.imageUrl,
          productData.category,
          productData.cores,
          productData.clockSpeedGhz
        );
      case 'GPU':
        return new GPU(
          productData.id,
          productData.name,
          productData.description,
          productData.price,
          productData.available,
          productData.imageUrl,
          productData.category
        );
      case 'MOTHERBOARD':
        return new Motherboard(
          productData.id,
          productData.name,
          productData.description,
          productData.price,
          productData.available,
          productData.imageUrl,
          productData.category
        );
      case 'RAM':
        return new RAM(
          productData.id,
          productData.name,
          productData.description,
          productData.price,
          productData.available,
          productData.imageUrl,
          productData.category
        );
      case 'CASE':
        return new Case(
          productData.id,
          productData.name,
          productData.description,
          productData.price,
          productData.available,
          productData.imageUrl,
          productData.category
        );
      default:
        return productData as Product;
    }
  }
}

