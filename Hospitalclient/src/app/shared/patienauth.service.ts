import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatienauthService {

  constructor() { /* TODO document why this constructor is empty */  }
  logout() :void {    
    localStorage.setItem('isPatientloggedIn','false');    
    localStorage.removeItem('token');    
    }    
}
