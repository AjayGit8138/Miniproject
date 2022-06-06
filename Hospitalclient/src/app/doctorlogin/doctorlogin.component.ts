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
  doctorloginformgroup:FormGroup;
  constructor(private fb:FormBuilder,private serveapi:ApiserviceService,private router:Router,private doctorauth:DoctorauthService,private toastrService:ToastrService) {
    this.doctorloginformgroup = this.fb.group({
      loginid:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
 
    this.doctorauth. doctorlogout();
  }
get loginid(){return this.doctorloginformgroup.get('loginid');}
get email(){return this.doctorloginformgroup.get('email');}
get password(){return this.doctorloginformgroup.get('password');}



public showSuccess(message:any): void {
  this.toastrService.success(message);
}
public showError(message:any): void {
  this.toastrService.error(message);
}
doctorloginauth(loginval:any)
{


  this.serveapi.checkdoctorlogin(loginval.loginid).subscribe((data)=>{
    const length = data.data.docs;
    console.log("total length",length);
  
    
    if((data.data.docs[0].email == loginval.email) && (data.data.docs[0].password == loginval.password))
    {
      localStorage.setItem('isdoctorLoggedIn','true');
        localStorage.setItem('token', loginval.loginid);  
        this.showSuccess("Login Successfull");
      this.router.navigate(['treat/mypatient',loginval.loginid]);
    }
    else{
      this.showError("Error Email or Password authentication failed!!!!");
      }
  
  })
}
}
