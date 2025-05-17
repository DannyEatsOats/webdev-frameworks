import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { authGuard, publicGuard } from './shared/guard/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent) },
  { path: 'auth', loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent), canActivate: [publicGuard] },
  { path: 'builder', loadComponent: () => import('./pages/builder/builder.component').then(c => c.BuilderComponent), canActivate: [authGuard] },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    //canActivate: [authGuard]
  },
  { path: '**', component: HomeComponent },
];
