import { inject, Injectable } from '@angular/core';
import { HeroesService } from '../../../core/domain/infrastructure/mocks/heroes/heroes.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Heroes } from '../../../core/domain/entity/heroes';
import { DeleteHeroes, GetHeroes, UpdateHeroes } from './heroes.action';
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
      tap(returnData => {
        const state = ctx.getState();
        console.log(returnData);
        ctx.setState({
          ...state,
          heroes: returnData, //here the data coming from the API will get assigned to the users variable inside the appstate
        });
      })
    );
  }

  /*  @Action(AddUsers)
  addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUsers) {
    return this._du.addUsers(payload).pipe(tap(returnData => {
      const state=ctx.getState();
      ctx.patchState({
        users:[...state.users,returnData]
      })
    }))
  }*/

  @Action(UpdateHeroes)
  updateDataOfState(
    ctx: StateContext<HeroesStateModel>,
    { payload, id, i }: UpdateHeroes
  ) {
    //TODO
    /*   return this..updateUser(payload, i).pipe(tap(returnData => {
      const state=ctx.getState();

      const userList = [...state.users];
      userList[i]=payload;

      ctx.setState({
        ...state,
        users: userList,
      });
    }))*/
  }

  @Action(DeleteHeroes)
  deleteDataFromState(
    ctx: StateContext<HeroesStateModel>,
    { id }: DeleteHeroes
  ) {
    //TODO
    /*    return this._du.deleteUser(id).pipe(tap(returnData => {
      const state=ctx.getState();
      console.log("The is is",id)
      //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
      const filteredArray=state.users.filter(contents=>contents.id!==id);

      ctx.setState({
        ...state,
        users:filteredArray
      })
    }))*/
  }
}
