import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminAuthForm:FormGroup;
  returnurl = '';
  constructor(private adminGroup:FormBuilder,private apiService:ApiserviceService,private appRouter:Router,private authServe:AuthService,private toastrService:ToastrService) {
    this.adminAuthForm = this.adminGroup.group({
        loginid:['',Validators.required],
        password:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.returnurl = '/docdash';
    this.authServe.logout();
  }

  adminAuth(formData:any)
  {
   
    this.apiService.getAdmin(formData).subscribe((data)=>{
     
    
      if((data.data.docs[0].loginid == formData.loginid) && (data.data.docs[0].password == formData.password))
    {
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('token', formData.loginid);  
      this.appRouter.navigate(['docdash',formData.loginid]);
      this.showSuccess("Login Successfull");
    }
    else{
      this.showError("Error Email or Password authentication failed!!!!")
    }
    })
  }

  public showSuccess(message:any): void {
    this.toastrService.success(message);
  }
  public showError(message:any): void {
    this.toastrService.error(message);
  }
  get loginid() {return this.adminAuthForm.get('loginid');}
  get password() {return this.adminAuthForm.get('password');}

}
