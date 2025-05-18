import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) { }

  // Method to update user profile in Firestore
  async updateUserProfile(updatedUserData: Partial<User>): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }

    const userRef = doc(this.firestore, `users/${user.uid}`);

    try {
      await setDoc(userRef, updatedUserData, { merge: true });
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Method to fetch user data from Firestore
  getUserData(): Observable<User | null> {
    return new Observable((observer) => {
      const user = this.auth.currentUser;
      if (!user) {
        observer.next(null);
        observer.complete();
        return;
      }

      const userRef = doc(this.firestore, `users/${user.uid}`);

      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          observer.next(docSnap.data() as User);
        } else {
          observer.next(null);
        }
        observer.complete();
      }).catch((error) => {
        console.error('Error fetching user data:', error);
        observer.next(null);
        observer.complete();
      });
    });
  }
}

