import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('slideFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class AuthComponent {
  isLogin = true;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}

