import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

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
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  userSubscription?: Subscription;
  user: User | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      fullName: [''],
      email: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;

        this.profileForm.patchValue({
          fullName: this.user.name ?? '',
          email: this.user.email ?? '',
          phone: this.user.phoneNum ?? '',
        });
      } else {
        this.profileForm.reset();
      }
    });
  }

  onSave() {
    if (this.profileForm.valid && this.user) {
      const updatedUserData: Partial<User> = {
        name: this.profileForm.value.fullName,
        phoneNum: this.profileForm.value.phone,
      };

      this.authService.updateUserProfile(updatedUserData);
      alert('Profile saved!');
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}

