import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) { }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}

