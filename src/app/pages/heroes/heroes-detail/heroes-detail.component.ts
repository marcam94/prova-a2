import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AsyncPipe, JsonPipe, Location, NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
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
import { HeroesLogicService } from '../heroes-logic.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-detail',
  standalone: true,
  templateUrl: './heroes-detail.component.html',
  styleUrl: './heroes-detail.component.css',
  imports: [MatCard, MatCardHeader, MatCardContent, AsyncPipe, JsonPipe, MatCardImage, MatCardTitle, MatCardSubtitle, MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelHeader, TitleCasePipe, MatMenuTrigger, MatMenu, MatMenuItem, MatButton, MatIcon, NgOptimizedImage, NgIf],
})
export class HeroesDetailComponent implements OnInit {
  @Input() heroId!: number | string;
  public hero?: Observable<Heroes | undefined>;
  public panelOpenState = false;
  private readonly heroesService = inject(HeroesLogicService);
  private readonly store = inject(Store);
  private readonly location = inject(Location);

  ngOnInit(): void {
    this.hero = this.heroesService.getHeroById(String(this.heroId));
  }

  deleteHero(id?: string) {
    this.heroesService.deleteHero(id).subscribe((confirm) => {
      if (confirm) this.goBack();
    });
  }

  editHero(heroe: Heroes) {
    this.heroesService.editHero(heroe).subscribe({
      complete: () => {
        this.hero = this.heroesService.getHeroById(String(this.heroId));
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
