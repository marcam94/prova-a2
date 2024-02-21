import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth';
import { NotFoundComponent } from './shared';

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
    path: 'home',
    redirectTo: 'home/heroes',
    pathMatch: 'full',
  },
  {
    path: 'home/heroes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/heroes/heroes.component').then(
            m => m.HeroesComponent
          ),
        pathMatch: 'full',
      },
      {
        path: 'detalle/:heroId',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/heroes/heroes-detail/heroes-detail.component').then(
            m => m.HeroesDetailComponent
          ),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
