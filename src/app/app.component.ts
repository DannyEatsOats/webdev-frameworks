import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MenuComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Notice you have styleUrls in plural, make sure this is correct
})
export class AppComponent {
  title = 'Polarex';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  closeSidenav() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  onSidenavClosed() {
    // You can add logic here if needed, like setting a flag
  }
}

