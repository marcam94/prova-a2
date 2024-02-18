import { Component, inject, OnInit } from '@angular/core';
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
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
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
import { HeroesService } from './heroes.service';
import { MatPaginator } from '@angular/material/paginator';
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
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  private readonly heroesService = inject(HeroesService);
  private readonly dialog = inject(DialogService);
  allHeroes: Subject<Heroes[]> = new BehaviorSubject<Heroes[]>([]);
  title!: string;
  value!: string;

  ngOnInit(): void {
    this.heroesService.getAll().subscribe(data => {
      this.allHeroes.next(data);
    });
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
    this.allHeroes.next(this.heroesService.getHeroesByFilter(this.value));
  }

  deleteHero(id?: string) {
    this.heroesService.deleteHero(id).subscribe();
  }

  editHero(hero: Heroes) {
    this.heroesService.editHero(hero).subscribe();
  }
}
