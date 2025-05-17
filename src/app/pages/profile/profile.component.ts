import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';  // Adjust path if needed
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userSubscription?: Subscription;
  user = {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(1990, 5, 15), // default/fallback value
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      fullName: [''],
      email: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      if (user) {
        this.user.email = user.email ?? '';
        this.user.fullName = user.displayName ?? '';
        this.user.phone = user.phoneNumber ?? '';

        // Patch the form values with the user info
        this.profileForm.patchValue({
          fullName: this.user.fullName,
          email: this.user.email,
          phone: this.user.phone,
        });
      } else {
        // No user logged in - clear form or redirect
        this.profileForm.reset();
      }
    });
  }

  onSave() {
    if (this.profileForm.valid) {
      console.log('Profile saved:', this.profileForm.value);
      // TODO: Implement save logic (e.g., update Firebase profile or DB)
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}

