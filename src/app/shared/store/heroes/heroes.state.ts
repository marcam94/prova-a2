import { inject, Injectable } from '@angular/core';
import { HeroesService } from '../../../core/domain/infrastructure/mocks/heroes/heroes.service';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Heroes } from '../../../core/domain/entity/heroes';
import {
  AddHero,
  DeleteHeroes,
  GetHeroById,
  GetHeroes,
  UpdateHeroes,
} from './heroes.action';
import { filter, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { switchMap } from 'rxjs/operators';

export class HeroesStateModel {
  heroes: Heroes[] = [];
}
const SESSION_KEY = 'username';
@State<HeroesStateModel>({
  name: 'heroestate',
  defaults: {
    heroes: [],
  },
})
@Injectable()
export class HeroesState implements NgxsOnInit {
  private readonly authService = inject(AuthService);
  private readonly heroesService = inject(HeroesService);

  constructor() {}

  ngxsOnInit(ctx: StateContext<any>): void {
    this.authService.isLogged.pipe(
      filter(isLogged => isLogged),
      switchMap(() => ctx.dispatch(new GetHeroes()))
    ).subscribe()
  }

  @Selector()
  static allHeroes(state: HeroesStateModel) {
    return state.heroes;
  }


  @Selector()
  static selectHeroById(state: HeroesStateModel) {
    return (id: string) => {
      return state.heroes.find(hero => hero.id === id);
    };
  }

  @Selector()
  static selectHeroesByName(state: HeroesStateModel) {
    return (substring: string) => {
      return state.heroes.filter(hero => hero.nombre.includes(substring));
    };
  }

  @Action(GetHeroes)
  getAll(ctx: StateContext<HeroesStateModel>) {
    return this.heroesService.getAllHeroes().pipe(
      tap(data => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          heroes: data,
        });
      })
    );
  }

  @Action(GetHeroById)
  getHeroById(ctx: StateContext<HeroesStateModel>, { id }: GetHeroById) {
    return this.heroesService.getById(id);
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
    return this.heroesService.delete(id); /*.pipe(
      tap(res => {
        console.log(res);
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
    );*/
  }
}
