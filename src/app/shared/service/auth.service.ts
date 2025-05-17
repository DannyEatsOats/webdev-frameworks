import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  docData
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;
  user: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
    this.user = this.getCurrentUser();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.pipe(
      switchMap(firebaseUser => {
        if (!firebaseUser) {
          return of(null);
        }

        const userRef = doc(this.firestore, 'users', firebaseUser.uid);

        return docData(userRef).pipe(
          switchMap((data: any) => {
            if (!data) return of(null);

            console.log(data);

            // Convert Firestore object to User instance
            const formattedUser = new User(
              data.id,
              data.name,
              data.email,
              data.phoneNum,
              data.dob?.seconds ? new Date(data.dob.seconds * 1000) : new Date(),
              data.role
            );

            console.log(formattedUser);
            return of(formattedUser);
          }),
          catchError(error => {
            console.error('Error fetching user data:', error);
            return of(null);
          })
        );
      })
    );
  }
  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  async signUp(email: string, password: string, userData: Partial<User>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
      });

      return userCredential;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, 'Users', userId);
    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser.pipe(
      switchMap(user => of(!!user))
    );
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}

