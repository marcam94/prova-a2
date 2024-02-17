import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {HeroesService} from "./core/domain/infrastructure/mocks/heroes/heroes.service";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {HeroesState} from "./shared/store/heroes/heroes.state";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
    provideHttpClient(withFetch()), importProvidersFrom(
      NgxsModule.forRoot([HeroesState]), NgxsLoggerPluginModule.forRoot()), HeroesService ]
};
