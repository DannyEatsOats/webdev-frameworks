import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "polarex-4d49b", appId: "1:465493305182:web:bbf75dd1a4335cc0cdd1cf", storageBucket: "polarex-4d49b.firebasestorage.app", apiKey: "AIzaSyAd390SueHrCxfsoRlSzHEvULpls6Mh3_8", authDomain: "polarex-4d49b.firebaseapp.com", messagingSenderId: "465493305182" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
