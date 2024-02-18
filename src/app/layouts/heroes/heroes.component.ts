import { Component, inject, Input, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
  MatCardSubtitle,
} from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { concatMap, EMPTY, Observable, switchMap, take } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { HeroesState } from '../../shared/store/heroes/heroes.state';
import {
  AddHero,
  DeleteHeroes, GetHeroById,
  GetHeroes,
  UpdateHeroes,
} from '../../shared/store/heroes/heroes.action';
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
import { DialogComponent } from '../../shared/components/ui-common/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(DialogService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  @Select(HeroesState.selectStateData) allHeroes!: Observable<Heroes[]>;
  title!: string;
  value!: string;

  ngOnInit(): void {
  }

  openDetail(heroId: string) {
    this.router.navigate(['detail', heroId], { relativeTo: this.activatedRoute  });
    /*const currentHero = this.store.selectSnapshot(HeroesState.selectHeroById)(id)
    if (!currentHero) {
      alert('No se ha encontrado el heroe')
      return
    }
    this.title = 'Detalle de heroe';
    const dialogData: DialogOpt = {
      component: HeroesDetailComponent,
      title: this.title,
      inputData: { name: 'heroe', value: currentHero },

    };
    const dialogRef = this.dialog.openDialog(dialogData, {
      width: '80vh',
      height: '80vh',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe();*/
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
    this.updateStateHeroesAfterDialogClose(null, dialogRef);
  }

  deleteHero(id?: string) {
    if (!id) {
      throw new Error('No se ha seleccionado un heroe');
    } else {
      if (!confirm('¿Estas seguro de eliminar este heroe?')) {
        return;
      }
      return this.store
        .dispatch(new DeleteHeroes(id))
        .pipe(
          take(1),
          switchMap(() => this.store.dispatch(new GetHeroes()))
        )
        .subscribe({
          next: () => alert('Heroe eliminado'),
          error: () => alert('Error al eliminar heroe'),
        });
    }
  }

  editHero(hero: Heroes) {
    if (!hero.id) {
      throw new Error('No se ha seleccionado un heroe');
    } else {
      this.title = 'Editar heroe';
      const dialogData: DialogOpt = {
        component: HeroesFormComponent,
        title: this.title,
        inputData: [{ name: 'heroe', value: hero }],
      };
      const dialogRef = this.dialog.openDialog(dialogData, {
        width: '80vh',
        height: '80vh',
        disableClose: false,
      });
      this.updateStateHeroesAfterDialogClose(hero.id, dialogRef);
    }
  }

  private updateStateHeroesAfterDialogClose(
    id: string | null,
    dialogRef: MatDialogRef<DialogComponent>
  ) {
    dialogRef
      .afterClosed()
      .pipe(
        concatMap(res => {
          if (!res) {
            return EMPTY;
          } else {
            return this.store
              .dispatch(id ? new UpdateHeroes(res, id, +id) : new AddHero(res))
              .pipe(concatMap(() => this.store.dispatch(new GetHeroes())));
          }
        })
      )
      .subscribe();
  }
}
