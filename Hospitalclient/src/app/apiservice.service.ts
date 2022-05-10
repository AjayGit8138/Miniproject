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
  // getconnection()
  // {
  //   this.http.get<any>('https://a1b21745-8512-41b2-8506-c83a13a27993-bluemix.cloudantnosqldb.appdomain.cloud/hospital_admission/_all_docs ').subscribe(data=>{
  //     console.log(data);
  //   })
  // }
}


