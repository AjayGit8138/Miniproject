import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {
  constructor(private routerServe:Router){}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isPatientloggedIn())
      {
    return true;
      }
      this.routerServe.navigate(['/patientdashboard']);
    
    
      return false;
  }
  public isPatientloggedIn():boolean{
    let status;
    if(localStorage.getItem('isPatientloggedIn')=="true"){
      status = true;
    }else{
      status = false;
    }
    return status;
  }
  
}
