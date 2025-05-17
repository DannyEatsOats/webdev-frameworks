import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.authService.signIn(this.username, this.password)
      .then(() => {
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/dashboard');
      })
      .catch(error => {
        this.errorMessage = this.getErrorMessage(error.code);
      });
  }

  private getErrorMessage(errorCode: string): string {
    console.log(errorCode);
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-credential':
        return 'The provided email or password is incorrect';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}

