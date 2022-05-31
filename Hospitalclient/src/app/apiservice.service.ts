import { getNumberOfCurrencyDigits } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 idgen:number = 0;
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')

  constructor(private http:HttpClient) {
    
   }


   //All API calls service to the Backend connection
   setloggedIn(value:boolean)
   {
     this.loggedInStatus = value;
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
    console.log("doctorlogin",doctorlogin);
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
  generatebloodreport(object:any)
  {
    return this.http.post<any>('http://localhost:8000/bloodreport',object);
  }
  deletepatient(object:any)
  {
    return this.http.delete<any>('http://localhost:8000/deletepatient/'+object._id+'/'+object._rev);
  }
  post(formData:any){
    return this.http.post<any>('http://localhost:8000/upload/',formData);
  }
  getadmin(request:any)
  {
    return this.http.get<any>('http://localhost:8000/admin/'+request);
  }
  postconsulting(consulting:any)
  {
    return this.http.post<any>('http://localhost:8000/consulting',consulting);
  }
  getadmittedpatients()
  {
    return this.http.get<any>('http://localhost:8000/admittedpatients');
  }
  generatebloodcountreport(bloodcountreport:any)
  {
     return this.http.post<any>('http://localhost:8000/bloodcountreport',bloodcountreport)
  }
  getfile(report:any)
  {
    console.log("report",report);
    var body = {filename:report};
    return this.http.post(`http://localhost:8000/download`, body, {
      responseType : 'blob',
  });
    
  }
  getdoctor(doctor:any)
  {
    return this.http.get<any>('http://localhost:8000/senddoctor/'+doctor);
  }
}


