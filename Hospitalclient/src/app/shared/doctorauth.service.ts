import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorauthService {

  constructor() { 
    console.log("Constructor")}
  doctorLogout():void{
    localStorage.setItem('isdoctorLoggedIn','false');
    localStorage.removeItem('token');
  }
}
