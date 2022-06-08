import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';
import { PatienauthService } from '../shared/patienauth.service';


@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {
  patientLoginForm:FormGroup;
  
  constructor(private fbBuilder:FormBuilder,private serveApi:ApiserviceService,private routerService:Router,private activeParams:ActivatedRoute,private patientAuth:PatienauthService,private toastrService:ToastrService) {
    this.patientLoginForm = this.fbBuilder.group({
      email:['',Validators.required],
      loginid:['',Validators.required],
      password:['',Validators.required]
    })
   }

  
  ngOnInit(): void {
    this.patientAuth.logout();
  }
  get patientname() {return this.patientLoginForm.get('patientname');}
  get email() {return this.patientLoginForm.get('email');}
  get password() {return this.patientLoginForm.get('password');}
  get loginid() {return this.patientLoginForm.get('loginid');}


  //Login Authentication Check
  loginAuth(loginval:any)
  {

    this.serveApi.checkPatientLogin(loginval.loginid).subscribe(data=>{
     
      for(let element of data.data.docs)
      {
      if((element.email == loginval.email) && (element.password == loginval.password))
      {
        localStorage.setItem('isPatientloggedIn','true');
        localStorage.setItem('token', loginval.loginid);  
    
     
        this.showSuccess("Login Successfull")
        this.routerService.navigate(['patientdashboard/',loginval.loginid]);
      }
      else{
        console.log("emailid",loginval.email);
        console.log("password",loginval.password);
        console.log("dbemail",element.email);
        console.log("dbpass",element.password);
        this.showError("Login Authentication Failed Invalid Password or Email Error");
       
      }
    }
    })
  }
//Toaster service for Notifications
  public showSuccess(message:any): void {
    this.toastrService.success(message);
  }
  public showError(message:any): void {
    this.toastrService.error(message);
  }
  
}
