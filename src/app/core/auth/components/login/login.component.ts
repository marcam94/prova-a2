import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatIconButton,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckbox,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  readonly router = inject(Router);
  readonly authService = inject(AuthService);
  hide = true;
  loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const name = this.loginForm.get('name')?.value;
      if (name) sessionStorage.setItem('username', name);
      this.authService
        .isLogged()
        .pipe(take(1))
        .subscribe(res => {
          if (res) this.router.navigate(['/home/heroes']);
          else alert('Something went wrong, try again');
        });
    }
  }
}
