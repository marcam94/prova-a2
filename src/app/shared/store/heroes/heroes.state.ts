import { inject, Injectable } from '@angular/core';
import { HeroesService } from '../../../core/domain/infrastructure/mocks/heroes/heroes.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Heroes } from '../../../core/domain/entity/heroes';
import {
  AddHero,
  DeleteHeroes,
  GetHeroes,
  UpdateHeroes,
} from './heroes.action';
import { tap } from 'rxjs';

export class HeroesStateModel {
  heroes: Heroes[] = [];
}

@State<HeroesStateModel>({
  name: 'heroestate',
  defaults: {
    heroes: [],
  },
})
@Injectable()
export class HeroesState {
  private readonly heroesService = inject(HeroesService);

  constructor() {}

  @Selector()
  static selectStateData(state: HeroesStateModel) {
    return state.heroes;
  }

  @Action(GetHeroes)
  getAll(ctx: StateContext<HeroesStateModel>) {
    return this.heroesService.getAllHeroes().pipe(
      tap(data => {
        const state = ctx.getState();
        console.log(data);
        ctx.setState({
          ...state,
          heroes: data,
        });
      })
    );
  }

  @Action(AddHero)
  addDataToState(ctx: StateContext<HeroesStateModel>, { payload }: AddHero) {
    return this.heroesService.post(payload);
  }

  @Action(UpdateHeroes)
  updateDataOfState(
    ctx: StateContext<HeroesStateModel>,
    { payload, id, i }: UpdateHeroes
  ) {
    return this.heroesService.put(payload, String(id)).pipe(
      tap(returnData => {
        const state = ctx.getState();

        const heroList = [...state.heroes];
        heroList[i] = payload;

        ctx.setState({
          ...state,
          heroes: heroList,
        });
      })
    );
  }

  @Action(DeleteHeroes)
  deleteDataFromState(
    ctx: StateContext<HeroesStateModel>,
    { id }: DeleteHeroes
  ) {
    return this.heroesService.delete(id).pipe(
      tap(res => {
        if (res) {
          const state = ctx.getState();
          const filteredArray = state.heroes.filter(
            contents => contents.id !== id
          );

          ctx.setState({
            ...state,
            heroes: filteredArray,
          });
        }
      })
    );
  }
}
