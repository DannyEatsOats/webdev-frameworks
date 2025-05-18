// src/app/services/build.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  private selectedProducts: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private firestore: Firestore, private auth: Auth) { }

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
      // Find the build by name and user ID
      const buildsRef = collection(this.firestore, 'builds');
      const buildQuery = query(buildsRef, where('name', '==', buildName), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(buildQuery);

      if (!querySnapshot.empty) {
        // Get the first matching document and delete it
        const buildDocRef = querySnapshot.docs[0].ref;
        await deleteDoc(buildDocRef);
        console.log(`Build "${buildName}" deleted successfully.`);
        return true;
      } else {
        console.warn('Build not found for deletion.');
        return false;
      }
    } catch (error) {
      console.error('Error deleting build:', error);
      return false;
    }
  }
}

