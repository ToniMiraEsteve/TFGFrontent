import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorage } from '../localStorage/auth.stroge';
import { Router } from '@angular/router';
import { Rol } from '../../enums/rol.enum';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authStorage: AuthStorage, private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let roles = route.data.roles as Array<Rol>; 

    const rolLogged = this.authStorage.getRol();
    for (const rol of roles) {
      if(rolLogged === rol){
        return true;
      }
    }

    this.authStorage.signOut();
    this.authService.logout().subscribe(
      response => {
        console.log('Logout exitoso');
        
      },
    );
    this.router.navigate(['/']);

    
    return false;
  }
  
}
