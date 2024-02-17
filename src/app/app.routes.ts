import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () =>
      import('./layouts/home/home.component').then(
        (x) => x.HomeComponent,
      ),
  },
];
