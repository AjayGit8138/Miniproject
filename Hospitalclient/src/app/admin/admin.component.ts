import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  adminauth:FormGroup;
  returnurl = '';
  constructor(private admingroup:FormBuilder,private api:ApiserviceService,private router:Router,private authserve:AuthService,private toastrService:ToastrService) {
    this.adminauth = this.admingroup.group({
        loginid:['',Validators.required],
        password:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.returnurl = '/docdash';
    this.authserve.logout();
  }

  Adminauth(formdata:any)
  {
    console.log("admindata",formdata);
    this.api.getadmin(formdata.loginid).subscribe((data)=>{
      console.log("Authorized email accepts",data);
    
      if((data.docs[0].loginid == formdata.loginid) && (data.docs[0].password == formdata.password))
    {
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('token', formdata.loginid);  
      this.router.navigate(['docdash',formdata.loginid]);
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
  get loginid() {return this.adminauth.get('loginid');}
  get password() {return this.adminauth.get('password');}

}
