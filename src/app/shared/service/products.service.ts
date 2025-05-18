import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, doc } from '@angular/fire/firestore';
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

  // Fetch a single product by ID
  getProductById(productId: string): Observable<Product | null> {
    const productRef = doc(this.firestore, `products/${productId}`);
    return docData(productRef, { idField: 'id' }).pipe(
      map(product => product ? this.mapProductToClass(product) : null)
    );
  }

  // Maps Firestore document data to the appropriate Product subclass
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
      case 'Motherboard':
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
      case 'Case':
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
        return productData as Product; // Fallback for unknown categories
    }
  }
}

