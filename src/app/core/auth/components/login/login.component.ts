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
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {


  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  public hide = true;
  public loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    sessionStorage.clear();
  }

  public login() {
    if (this.loginForm.valid) {
      const name = this.loginForm.get('name')?.value;
      if (name) sessionStorage.setItem('username', name);
      this.authService._isLoggedIn.next(true)
      this.authService
        .isLogged
        .pipe(take(1))
        .subscribe(res => {
          if (res) this.router.navigate(['/home/heroes']);
          else alert('Something went wrong, try again');
        });
    }
  }
}
