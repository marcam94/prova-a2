import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../../shared/components';
import {} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { HeroesComponent } from '../heroes/heroes.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MatButton, HeroesComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //TODO landing page
}
