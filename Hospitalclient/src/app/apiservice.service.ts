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
  //  .subscribe(data=>{
  //   console.log(data);
  //   this.idgen = parseInt(JSON.stringify(data));
  
  //   console.log("valuefrom",this.idgen);
  //  });
  //   console.log(this.idgen);
 
   
 
   
  }

}


