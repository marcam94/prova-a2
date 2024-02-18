import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { HeroesState } from '../../../shared/store/heroes/heroes.state';
import { AsyncPipe, JsonPipe, Location, TitleCasePipe } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { Heroes } from '../../../core/domain/entity/heroes';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes-detail',
  standalone: true,
  templateUrl: './heroes-detail.component.html',
  styleUrl: './heroes-detail.component.css',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    AsyncPipe,
    JsonPipe,
    MatCardImage,
    MatCardTitle,
    MatCardSubtitle,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    TitleCasePipe,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatIcon,
  ],
})
export class HeroesDetailComponent implements OnInit {
  private readonly heroesService = inject(HeroesService);
  private readonly store = inject(Store);
  private readonly location = inject(Location);
  @Input() heroId!: number | string;
  public hero?: Heroes;
  public panelOpenState = false;

  ngOnInit(): void {
    this.hero = this.store.selectSnapshot(HeroesState.selectHeroById)(
      String(this.heroId)
    );
    if (!this.hero) {
      alert('Hero not found');
      this.goBack();
    }
  }

  deleteHero(id?: string) {
    this.heroesService.deleteHero(id).subscribe(() => this.goBack());
  }

  editHero() {
    if (this.hero) {
      this.heroesService.editHero(this.hero).subscribe({
        complete: () => {
          this.hero = this.store.selectSnapshot(HeroesState.selectHeroById)(
            String(this.heroId)
          );
        },
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
