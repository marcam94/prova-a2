import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconModule,
    MatIconButton,
    AsyncPipe,
    TitleCasePipe,
    MatIcon,
    MatMenuModule,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  public username$ = this.authService.getUserName();
  private readonly router = inject(Router);

  public logout() {
    sessionStorage.clear();
    alert('You have been logged out');
    this.router.navigate(['/login']);
  }
}
