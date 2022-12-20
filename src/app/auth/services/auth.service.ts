import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _authUser!: AuthUser;

  get authUser() {
    return { ...this._authUser };
  }

  constructor(private http: HttpClient) { }

  // Verificar estado de autenticación
  verifyAutentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return of(true);
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<AuthUser>(url, body)
      .pipe(
        tap(resp => {
          this._authUser = {
            token: resp.token
          }
          localStorage.setItem('token', resp.token)
        }),
        map(resp => resp),
        catchError(errResponse => of(errResponse.error.error))
      )
  }

  register(email: string, password: string) {
    const url = `${this.baseUrl}/register`;
    const body = { email, password };

    return this.http.post<AuthUser>(url, body)
      .pipe(
        tap(resp => {
          this._authUser = {
            token: resp.token
          }
          localStorage.setItem('token', resp.token)
        }),
        map(resp => resp),
        catchError(errResponse => of(errResponse.error.error))
      )
  }
}
