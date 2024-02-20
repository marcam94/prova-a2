import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { EMPTY, Observable, of } from 'rxjs';
import { concatMap, switchMap, take } from 'rxjs/operators';
import {
  AddHero,
  DeleteHeroes,
  GetHeroes,
  UpdateHeroes,
} from '../../shared/store/heroes/heroes.action';
import { Heroes } from '../../core/domain/entity/heroes';
import {
  DialogOpt,
  DialogService,
} from '../../shared/components/ui-common/dialog/dialog.service';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import { DialogComponent } from '../../shared/components';
import { HeroesState } from '../../shared/store/heroes/heroes.state';

@Injectable({
  providedIn: 'root',
})
export class HeroesLogicService {
  constructor(
    private store: Store,
    private dialog: DialogService
  ) {}
  @Select(HeroesState.allHeroes) allHeroes$!: Observable<Heroes[]>
  public deleteHero(id?: string): Observable<any> {
    if (!id) {
      throw new Error('No se ha seleccionado un heroe');
    } else {
      if (!confirm('¿Estas seguro de eliminar este heroe?')) {
        return of(undefined);
      }
      return this.store.dispatch(new DeleteHeroes(id)).pipe(
        take(1),
        switchMap(() => this.store.dispatch(new GetHeroes()))
      );
    }
  }

  public getHeroesByFilter(filter: string): Heroes[] {
    return this.store.selectSnapshot(HeroesState.selectHeroesByName)(filter);
  }

  public getHeroById(id: string): Observable<Heroes | undefined> {
    return this.store.select(HeroesState.selectHeroById)
      .pipe(
        switchMap(selectHeroById => of(selectHeroById(id)))
      )
  }

  public getAll(): Observable<Heroes[]> {
    return this.allHeroes$
  }

  public editHero(hero: Heroes): Observable<any> {
    if (!hero.id) {
      throw new Error('No se ha seleccionado un heroe');
    } else {
      const title = 'Editar heroe';
      const dialogData: DialogOpt = {
        component: HeroesFormComponent,
        title: title,
        inputData: [{ name: 'heroe', value: hero }],
      };
      const dialogRef = this.dialog.openDialog(dialogData, {
        width: '80vh',
        height: '80vh',
        disableClose: false,
      });
      return this.updateStateHeroesAfterDialogClose(hero.id, dialogRef);
    }
  }

  public addNewHero(hero: Heroes): Observable<any> {
    return this.store.dispatch(new AddHero(hero)).pipe(
      take(1),
      switchMap(() => this.store.dispatch(new GetHeroes()))
    );
  }

  private updateStateHeroesAfterDialogClose(
    id: string,
    dialogRef: MatDialogRef<DialogComponent>
  ): Observable<any> {
    return dialogRef.afterClosed().pipe(
      take(1),
      concatMap(res => {
        if (!res) {
          return EMPTY;
        } else {
          return this.store
            .dispatch(new UpdateHeroes(res, id, +id))
            .pipe(concatMap(() => this.store.dispatch(new GetHeroes())));
        }
      })
    );
  }
}
