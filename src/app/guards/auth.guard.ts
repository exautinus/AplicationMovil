import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Comenta el siguiente bloque para deshabilitar temporalmente el guard
    /*
    const user = localStorage.getItem('user');

    return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (auth && user) {
          resolve(true);
        } else {
          this.firebaseSvc.signOut();
          resolve(false);
        }
      });
    });
    */
    
    // Devuelve siempre true para deshabilitar el guard temporalmente
    return true;
  }
}
