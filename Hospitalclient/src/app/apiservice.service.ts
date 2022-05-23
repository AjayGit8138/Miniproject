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
  bookappointment(appoint:any,refid:any)
  {
    console.log("Bookappointment",refid);
    return this.http.put<any>('http://localhost:8000/updatepatienrecord/'+refid,appoint);
  }
  getdoctorslist(getreference:any)
  {
    var doctor = getreference;
    return this.http.get<any>('http://localhost:8000/getdoctordetails/'+doctor);
  }
  gettablets(reference:any){
    return this.http.get<any>('http://localhost:8000/gettablets/'+reference);
  }
  generatetestreport(object:any)
  {
    return this.http.post<any>('http://localhost:8000/generatemedicalreport',object);
  }
  gettestreport(id:any)
  {
    return this.http.get<any>('http://localhost:8000/getreport/'+id);
  }
}


