import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './core/auth/components';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavbarComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    NavbarComponent,
    LoginComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'prova-a2';
}
