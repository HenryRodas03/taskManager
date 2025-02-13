import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          if (data['status']) {
            localStorage.setItem(
              'accessToken',
              data['data']['token_type'] + ' ' + data['data']['access_token']
            );
            localStorage.setItem(
              'userId',
              data['data']['information_user']['id']
            );
            localStorage.setItem(
              'userName',
              data['data']['information_user']['user_name']
            );
            this.router.navigate(['/tasks']);
          }
        },
      });
    }
  }

  get formControls(): any {
    return this.loginForm.controls;
  }
}
