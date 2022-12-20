import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verifyAutentication()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
    /* if (this.authService.authUser.token) {
      return true;
    }
    
    console.log('bloqueado por el AuthGuard - CanActivate');
    if (!this.authService.authUser.token) {
      this.router.navigate(['./auth/login'])      
    }
    return false; */
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verifyAutentication()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      )

    /* if (this.authService.authUser.token) {
      return true;
    }
    
    console.log('bloqueado por el AuthGuard - CanLoad');
    if (!this.authService.authUser.token) {
      this.router.navigate(['./auth/login'])      
    }
    return false; */
  }
}
