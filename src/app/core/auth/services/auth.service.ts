import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const SESSION_KEY = 'username';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio muy básico de autenticacion (simulado...)
 */
export class AuthService {
  constructor() {}

  isLogged(): Observable<boolean> {
    if (sessionStorage.getItem(SESSION_KEY)) {
      return of(true);
    }
    return of(false);
  }

  getUserName(): Observable<string | null> {
    return of(sessionStorage.getItem(SESSION_KEY));
  }
}
