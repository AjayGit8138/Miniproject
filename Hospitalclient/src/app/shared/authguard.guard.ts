import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router:Router){}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(this.isLoggedIn())
      {
    return true;
      }
      this.router.navigate(['/docdash']);
    
    
      return false;

      
  }

  
  public isLoggedIn():boolean{
    let status;
    if(localStorage.getItem('isLoggedIn')=="true"){
      status = true;
    }else{
      status = false;
    }
    return status;
  }
 
}
