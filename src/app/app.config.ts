import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { HeroesService } from './core/domain/infrastructure/mocks/heroes/heroes.service';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HeroesState } from './shared/store/heroes/heroes.state';
import { LoadingInterceptor, spinnerInterceptor } from './shared/components/util-common/interceptors/loading-interceptor/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(),
    withInterceptorsFromDi(),
    withInterceptors([spinnerInterceptor]) 
    ),
    {provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true},
    importProvidersFrom(
      NgxsModule.forRoot([HeroesState]),
      NgxsLoggerPluginModule.forRoot()
    ),
    HeroesService,
  ],
};
