import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatienauthService {

  constructor() { }
  logout() :void {    
    localStorage.setItem('isPatientloggedIn','false');    
    localStorage.removeItem('token');    
    }    
}
