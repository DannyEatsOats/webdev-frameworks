import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';

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

  constructor(private authService: AuthService) { }

  async register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await this.authService.signUp(this.email, this.password, {
        name: this.username
      });

      // If registration is successful, log the user in automatically
      await this.authService.signIn(this.email, this.password);

      alert('Registration successful! Logged in automatically.');
      window.location.href = "/profile";
    } catch (error) {
      alert('Registration failed: ' + error);
    }
  }
}

