import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorauthService {

  constructor() { }
  doctorlogout():void{
    localStorage.setItem('isdoctorLoggedIn','false');
    localStorage.removeItem('token');
  }
}
