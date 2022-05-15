import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {
  patientloginform:FormGroup
  constructor(private fb:FormBuilder,private serveapi:ApiserviceService,private router:Router) {

    // this.serveapi.getconnection();
    this.patientloginform = this.fb.group({
    
      email:['',Validators.required],
      loginid:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
  get patientname() {return this.patientloginform.get('patientname');}
  get email() {return this.patientloginform.get('email');}
  get password() {return this.patientloginform.get('password');}
  get loginid() {return this.patientloginform.get('loginid');}

  loginauth(loginval:any)
  {
    console.log("Login details",loginval);
    var searchobject = {
      selector:{
        "requestId":loginval.loginid
      }
      
    }
    
    console.log(searchobject);
    this.serveapi.checkpatientlogin(loginval.loginid).subscribe(data=>{
      console.log("Data search successfully returned",data);

      if((data.email == loginval.email) && (data.password == loginval.password))
      {
        this.router.navigate(['patientdashboard']);
      }
      else{
        // this.toastr.warning("Hi Patient wrong authentication,Please enter correct Email and Password");
      }
    })
  }
  
}
