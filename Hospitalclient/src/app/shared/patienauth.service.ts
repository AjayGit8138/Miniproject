import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatienauthService {

  constructor() { 
    console.log("Constructor")  }
  logout() :void {    
    localStorage.setItem('isPatientloggedIn','false');    
    localStorage.removeItem('token');    
    }    
}
