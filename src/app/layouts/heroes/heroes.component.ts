import {Component, inject, OnInit} from '@angular/core';
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
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {HeroesState} from "../../shared/store/heroes/heroes.state";
import {GetHeroes} from "../../shared/store/heroes/heroes.action";

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
export class HeroesComponent implements OnInit {
  private readonly store = inject(Store)
  private readonly heroesService = inject(HeroesService)
  @Select(HeroesState.selectStateData) userInfo$!: Observable<any>;
  heroes$ = this.heroesService.getAllHeroes()

  ngOnInit(): void {
    this.store.dispatch(new GetHeroes())
  }
}
