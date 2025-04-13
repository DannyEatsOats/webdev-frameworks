import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';  // Import MatInputModule
import { MatButtonModule } from '@angular/material/button';  // Import MatButtonModule
import { MatFormFieldModule } from '@angular/material/form-field';  // Import MatFormFieldModule
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule for the eye icon (if used)
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule for form validation

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;  // For toggling password visibility

  register() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }

    console.log('Registering:', this.username, this.email, this.password);
    // Implement registration logic here
  }
}

