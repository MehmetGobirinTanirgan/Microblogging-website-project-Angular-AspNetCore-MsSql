import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RouteGuardService implements CanActivate {

constructor(private router:Router,private authService:AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let flag = this.authService.isLoggedIn();
    if(flag){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

}
