import { Component } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private navigation: NavigationService) { }

  redirectTo(path: string) {
    this.navigation.redirectTo(path);
  }
}
