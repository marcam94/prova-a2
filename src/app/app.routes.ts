import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./layouts/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: 'heroes',
        pathMatch: 'full',
        loadComponent: () =>
          import('./layouts/heroes/heroes.component').then(
            m => m.HeroesComponent
          ),
      },
      {
        path: 'heroes/:heroId',
        loadComponent: () =>
          import('./layouts/heroes/heroes.component').then(
            m => m.HeroesComponent
          ),
      },
    ],
  },
];
