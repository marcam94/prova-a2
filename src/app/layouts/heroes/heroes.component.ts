import { Component, inject, Input, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { HeroesService } from '../../core/domain/infrastructure/mocks/heroes/heroes.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { HeroesState } from '../../shared/store/heroes/heroes.state';
import { GetHeroes } from '../../shared/store/heroes/heroes.action';
import { Heroes } from '../../core/domain/entity/heroes';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/ui-common/dialog/dialog.component';

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
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  @Select(HeroesState.selectStateData) allHeroes!: Observable<Heroes[]>;
  @Input() heroId!: number;
  title!: string;
  ngOnInit(): void {
    this.store.dispatch(new GetHeroes());
  }

  checkDetail(id: number) {
    this.title = 'Editar heroe';
    //abrir diaologo pasando datos del heroe seleccionado.
    console.log(id);
  }

  addNew() {
    this.title = 'Nuevo heroe';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: this.title },
      width: '580px',
      height: '550px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => console.log('closed'));
  }
}
