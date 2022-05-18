import { getNumberOfCurrencyDigits } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 idgen:number = 0;
  

  constructor(private http:HttpClient) {
    
   }

 gettotalpatients(getcategory:any,getlist:any){
  
 
   return this.http.get<any>('http://localhost:8000/totalpatients/'+getcategory+'/'+getlist);
   
  }
  storepatientrecord(formobject:any)
  {
    return this.http.post<any>('http://localhost:8000/storepatient/',formobject);
  }

  checkpatientlogin(Formvalue:any)
  {
    return this.http.get<any>('http://localhost:8000/checkpatientlogin/'+Formvalue);
  }
  storedoctorprofile(doctorform:any)
  {
    return this.http.post<any>('http://localhost:8000/savedoctorprofile/',doctorform);
  }
  checkdoctorlogin(doctorlogin:any)
  {
    return this.http.get<any>('http://localhost:8000/doctorloginauth/'+doctorlogin);
  }
  getrequestedpatient()
  {
    return this.http.get<any>('http://localhost:8000/bookrequested/');
  }
  bookappointment(appoint:any)
  {
    console.log(appoint);
    return this.http.put<any>('http://localhost:8000/updatepatienrecord/'+appoint.requestId,appoint);
  }
  getdoctorslist(getreference:any)
  {
    var doctor = getreference;
    return this.http.get<any>('http://localhost:8000/getdoctordetails/'+doctor);
  }
}


