import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorauthGuard implements CanActivate {
  constructor(private routerServe:Router){}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    if(this.isdoctorLoggedIn())
    {
       return true;

     }
     this.routerServe.navigate(['/home']);
      return false;
  }
  
  public isdoctorLoggedIn():boolean{
    let status;
    if(localStorage.getItem('isdoctorLoggedIn')=="true"){
      status = true;
    }else{
      status = false;
    }
    return status;
  }
}
