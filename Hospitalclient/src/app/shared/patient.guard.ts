import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isPatientloggedIn())
      {
    return true;
      }
      this.router.navigate(['/patientdashboard']);
    
    
      return false;
  }
  public isPatientloggedIn():boolean{
    let status = false;
    if(localStorage.getItem('isPatientloggedIn')=="true"){
      status = true;
    }else{
      status = false;
    }
    return status;
  }
  
}
