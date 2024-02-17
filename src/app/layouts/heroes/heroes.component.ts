import {Component, inject} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {HeroesService} from "../../core/domain/infrastructure/mocks/heroes/heroes.service";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  private readonly heroesService = inject(HeroesService)
  heroes$ = this.heroesService.getAllHeroes()
}
