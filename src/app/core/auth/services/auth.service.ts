import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

const SESSION_KEY = 'username';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio muy básico de autenticacion (simulado...)
 */
export class AuthService {
  public _isLoggedIn = new BehaviorSubject<boolean>(false)
  public isLogged = this._isLoggedIn.asObservable()
  constructor() {
    if (sessionStorage?.getItem(SESSION_KEY)) this._isLoggedIn.next(true)
  }
  getUserName(): Observable<string | null> {
    return of(sessionStorage.getItem(SESSION_KEY));
  }
}
