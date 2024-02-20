import { Component, inject, OnInit, signal } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Heroes } from '../../core/domain/entity/heroes';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import {
  DialogOpt,
  DialogService,
} from '../../shared/components/ui-common/dialog/dialog.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeroesLogicService } from './heroes-logic.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NavbarComponent } from '../../shared/components';

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
    MatFormField,
    FormsModule,
    MatIconButton,
    MatLabel,
    MatIcon,
    MatInput,
    RouterOutlet,
    RouterLink,
    MatPaginator,
    NavbarComponent,
    TitleCasePipe,
    NgOptimizedImage,
    NgIf,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  private readonly heroesService = inject(HeroesLogicService);
  private readonly dialog = inject(DialogService);
  heroes = signal<Heroes[]>([]);
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  title!: string;
  value!: string;

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroesService.getAll().subscribe(data => {
      this.heroes.set(
        data.slice(
          this.pageIndex * this.pageSize,
          (this.pageIndex + 1) * this.pageSize
        )
      );
      this.length = data.length;
    });
  }

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHeroes();
  }

  addNewHero() {
    this.title = 'Añadir nuevo heroe';
    const dialogData: DialogOpt = {
      component: HeroesFormComponent,
      title: this.title,
    };
    const dialogRef = this.dialog.openDialog(dialogData, {
      width: '80vh',
      height: '80vh',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService
          .addNewHero(result)
          .subscribe(() => alert('Heroe añadido'));
      }
    });
  }

  findByName() {
    if (this.value && this.value.trim() !== '') {
      const data = this.heroesService.getHeroesByFilter(this.value);
      console.log(data);
      this.heroes.set(data);
      this.length = data.length;
    } else {
      this.loadHeroes();
    }
  }
}
