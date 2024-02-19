import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatIconModule, MatIconButton, AsyncPipe, TitleCasePipe, MatIcon, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  public username$ = this.authService.getUserName();
  

  public logout(){
    sessionStorage.clear();
    alert('You have been logged out');
    this.router.navigate(['/login']);
  }
}
