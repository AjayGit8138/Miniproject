import { getNumberOfCurrencyDigits } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 idgen:number = 0;
  

  constructor(private http:HttpClient) {
    
   }

 gettotalpatients(getcategory:any){
  
 
   return this.http.get<any>('http://localhost:8000/totalpatients/'+getcategory);
   
  }
  storepatientrecord(formobject:any)
  {
    return this.http.post<any>('http://localhost:8000/storepatient/',formobject);
  }
}


