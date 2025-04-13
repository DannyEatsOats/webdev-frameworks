import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

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
export class ProfileComponent {
  profileForm: FormGroup;
  user = {
    fullName: 'Jónás Rómeó',
    email: 'jonasromeao@gooning.com',
    phone: '+123456789',
    dateOfBirth: new Date(1990, 5, 15),
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: [this.user.fullName],
      email: [this.user.email],
      phone: [this.user.phone],
    });
  }

  onSave() {
    if (this.profileForm.valid) {
      console.log('Profile saved:', this.profileForm.value);
      // Handle save logic here
    }
  }
}

