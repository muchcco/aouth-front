import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard: Verificando acceso a:', state.url);
    if (isPlatformBrowser(this.platformId)) {
      const accessToken = localStorage.getItem('access_token');
      console.log('AuthGuard: Token de acceso encontrado:', accessToken);
      if (accessToken) {
        return true;
      } else {
        console.log('AuthGuard: Redirigiendo al login');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
    return false; 
  }
}