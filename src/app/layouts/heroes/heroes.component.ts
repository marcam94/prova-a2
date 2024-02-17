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
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { HeroesState } from '../../shared/store/heroes/heroes.state';
import {
  DeleteHeroes,
  GetHeroes,
} from '../../shared/store/heroes/heroes.action';
import { Heroes } from '../../core/domain/entity/heroes';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import {
  DialogOpt,
  DialogService,
} from '../../shared/components/ui-common/dialog/dialog.service';

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
  private readonly dialog = inject(DialogService);
  @Select(HeroesState.selectStateData) allHeroes!: Observable<Heroes[]>;
  @Input() heroId!: number;
  title!: string;
  ngOnInit(): void {
    this.store.dispatch(new GetHeroes());
  }

  checkDetail(id?: string) {
    this.title = 'Editar heroe';
    //abrir diaologo pasando datos del heroe seleccionado.
    console.log(id);
  }

  addNew() {
    this.title = 'Nuevo heroe';
    const dialogData: DialogOpt = {
      component: HeroesFormComponent,
      title: this.title,
    };
    const dialogRef = this.dialog.openDialog(dialogData, {
      width: '80vh',
      height: '80vh',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => console.log('closed', res));
  }

  deleteHero(id?: string) {
    if (id) return this.store.dispatch(new DeleteHeroes(id));
    else throw new Error('No se ha seleccionado un heroe');
  }
}
