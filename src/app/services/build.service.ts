import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ProductType } from '../models/product-type';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  private selectedProducts: { [key in ProductType]: Product[] } = {
    [ProductType.CPU]: [],
    [ProductType.GPU]: [],
    [ProductType.CASE]: [],
    [ProductType.RAM]: [],
    [ProductType.MOTHERBOARD]: [],
    [ProductType.STORAGE]: []
  };

  private productsSubject = new BehaviorSubject<{ [key in ProductType]: Product[] }>(this.selectedProducts);
  products$ = this.productsSubject.asObservable();

  constructor(private firestore: Firestore, private auth: Auth) { }

  addProduct(product: Product) {
    if (!product || !product.category) {
      console.warn('Invalid product.');
      return;
    }

    this.selectedProducts[product.category].push(product);
    this.productsSubject.next({ ...this.selectedProducts });
  }

  getProducts(): { [key in ProductType]: Product[] } {
    return this.selectedProducts;
  }

  removeProduct(id: string) {
    for (const type in this.selectedProducts) {
      this.selectedProducts[type as ProductType] = this.selectedProducts[type as ProductType].filter(p => p.id !== id);
    }

    this.productsSubject.next({ ...this.selectedProducts });
  }

  clear() {
    Object.keys(this.selectedProducts).forEach(type => {
      this.selectedProducts[type as ProductType] = [];
    });

    this.productsSubject.next({ ...this.selectedProducts });
  }

  async getUserBuilds(): Promise<any[]> {
    const user = this.auth.currentUser;
    if (!user) return [];

    const buildsRef = collection(this.firestore, 'builds');
    const buildQuery = query(buildsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(buildQuery);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getBuildById(buildId: string): Promise<any | null> {
    const buildRef = doc(this.firestore, `builds/${buildId}`);
    const buildSnapshot = await getDoc(buildRef);

    return buildSnapshot.exists() ? buildSnapshot.data() : null;
  }

  async saveBuild(build: any): Promise<boolean> {
    const buildsRef = collection(this.firestore, 'builds');
    const user = this.auth.currentUser;

    if (!user) {
      alert('You must be logged in to save a build.');
      return false;
    }

    try {
      const buildQuery = query(buildsRef, where('name', '==', build.name), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(buildQuery);

      const componentIds = Object.keys(build.selected).reduce((acc, key) => {
        acc[key] = build.selected[key]?.id || null;
        return acc;
      }, {} as { [key: string]: string | null });

      if (!querySnapshot.empty) {
        const existingBuildDoc = querySnapshot.docs[0].ref;

        await setDoc(existingBuildDoc, {
          userId: user.uid,
          name: build.name,
          components: componentIds,
          totalPrice: Object.values(build.selected)
            .filter((component: any) => component)
            .reduce((sum, component: any) => sum + component.price, 0)
        }, { merge: true });

        alert(`Build "${build.name}" updated successfully for user ${user.email}`);
        return true;
      } else {
        await addDoc(buildsRef, {
          userId: user.uid,
          name: build.name,
          components: componentIds,
          totalPrice: Object.values(build.selected)
            .filter((component: any) => component)
            .reduce((sum, component: any) => sum + component.price, 0)
        });

        alert(`Build "${build.name}" saved successfully for user ${user.email}`);
        return true;
      }
    } catch (error) {
      alert('An error occurred while saving the build. Please try again.');
      return false;
    }
  }

  async deleteBuild(buildName: string): Promise<boolean> {
    const user = this.auth.currentUser;
    if (!user) {
      alert('You must be logged in to delete a build.');
      return false;
    }

    try {
      const buildsRef = collection(this.firestore, 'builds');
      const buildQuery = query(buildsRef, where('name', '==', buildName), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(buildQuery);

      if (!querySnapshot.empty) {
        const buildDocRef = querySnapshot.docs[0].ref;
        await deleteDoc(buildDocRef);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

