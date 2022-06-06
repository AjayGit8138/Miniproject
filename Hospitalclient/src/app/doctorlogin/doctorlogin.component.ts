import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiserviceService } from '../apiservice.service';

import { DoctorauthService } from '../shared/doctorauth.service';

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.component.html',
  styleUrls: ['./doctorlogin.component.css']
})
export class DoctorloginComponent implements OnInit {
  doctorLoginFormgroup:FormGroup;
  constructor(private fbBuilder:FormBuilder,private serveApi:ApiserviceService,private routerService:Router,private doctorAuth:DoctorauthService,private toastrService:ToastrService) {
    this.doctorLoginFormgroup = this.fbBuilder.group({
      loginid:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
 
    this.doctorAuth.doctorLogout();
  }
get loginid(){return this.doctorLoginFormgroup.get('loginid');}
get email(){return this.doctorLoginFormgroup.get('email');}
get password(){return this.doctorLoginFormgroup.get('password');}



public showSuccess(message:any): void {
  this.toastrService.success(message);
}
public showError(message:any): void {
  this.toastrService.error(message);
}
doctorLoginAuth(loginval:any)
{


  this.serveApi.checkDoctorLogin(loginval.loginid).subscribe((data)=>{
    if((data.data.docs[0].email == loginval.email) && (data.data.docs[0].password == loginval.password))
    {
      localStorage.setItem('isdoctorLoggedIn','true');
        localStorage.setItem('token', loginval.loginid);  
        this.showSuccess("Login Successfull");
      this.routerService.navigate(['treat/mypatient',loginval.loginid]);
    }
    else{
      this.showError("Error Email or Password authentication failed!!!!");
      }
  
  })
}
}
