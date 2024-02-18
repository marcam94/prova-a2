import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth';
import { NotFoundComponent } from './shared/components';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./core/auth/components/login/login.component').then(
        x => x.LoginComponent
      ),
  },
  {
    path: 'home/heroes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./layouts/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./layouts/heroes/heroes.component').then(
            m => m.HeroesComponent
          ),
        pathMatch: 'full',
      },
      {
        path: 'heroe/detalle/:heroId',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./layouts/heroes/heroes-detail/heroes-detail.component').then(
            m => m.HeroesDetailComponent
          ),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
