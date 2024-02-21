import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Heroes } from '../../../entity/heroes';
import { HeroesModel } from './heroes-model';
import { HeroesMapper } from './heroes.mapper';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private readonly apiUrl = 'http://localhost:3000/Heroes';
  private readonly http = inject(HttpClient);

  constructor() {}

  getAllHeroes(): Observable<Heroes[]> {
    return this.http.get<HeroesModel[]>(this.apiUrl).pipe(
      map((response: HeroesModel[]) => response.map(HeroesMapper.mapFrom)),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  getById(id: string): Observable<Heroes> {
    return this.http.get<HeroesModel>(`${this.apiUrl}/${id}`).pipe(
      map((response: HeroesModel) => HeroesMapper.mapFrom(response)),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  post(data: Heroes): Observable<boolean> {
    const dataModel = HeroesMapper.mapTo(data);
    return this.http.post(this.apiUrl, dataModel).pipe(
      map(() => true),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  put(data: Heroes, id: string): Observable<boolean> {
    const dataModel = HeroesMapper.mapTo(data);
    return this.http.put(`${this.apiUrl}/${id}`, dataModel).pipe(
      map(() => true),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => true),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }
}
