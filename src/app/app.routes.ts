import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'home',
    loadComponent: () =>
      import('./layouts/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'heroes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./layouts/heroes/heroes.component').then(
            m => m.HeroesComponent
          ),
        pathMatch: 'full',
      },
      {
        path: ':heroId',
        loadComponent: () =>
          import('./layouts/heroes/heroes-detail/heroes-detail.component').then(
            m => m.HeroesDetailComponent
          ),
      },
    ],
  },
];
