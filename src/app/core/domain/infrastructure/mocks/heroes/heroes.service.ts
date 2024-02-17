import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Heroes} from "../../../entity/heroes";
import {HeroesModel} from "./heroes-model";
import {HeroesMapper} from "./heroes.mapper";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private readonly apiUrl = 'http://localhost:3000/Heroes'
  private readonly httpClient = inject(HttpClient)
  constructor() { }

  getAllHeroes(): Observable<Heroes[]> {
    return this.httpClient.get<HeroesModel[]>(this.apiUrl).pipe(
      map((response: HeroesModel[]) => response.map(HeroesMapper.mapFrom)),
    /*  map((response: HeroesModel[]) => response),
      map((heroes: HeroesModel) => HeroesMapper.mapFrom(heroes)),*/
      catchError((error: any) => {
        throw new Error(error)
      }
    ))
  }
}
