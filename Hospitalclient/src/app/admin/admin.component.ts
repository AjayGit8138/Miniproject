import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminauth:FormGroup;
  constructor(private admingroup:FormBuilder,private api:ApiserviceService,private router:Router) {
    this.adminauth = this.admingroup.group({
        loginid:['',Validators.required],
        password:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  Adminauth(formdata:any)
  {
    console.log("admindata",formdata);
    this.api.checkdoctorlogin(formdata.loginid).subscribe((data)=>{
      console.log("Authorized email accepts",data.id);
      console.log("password",data.password);
      if((data.id == formdata.loginid) && (data.password == formdata.password))
    {
     
      this.router.navigate(['docdash']);
    }
    else{
      alert("Error Email or Password authentication failed!!!!");
      // this.toast.success("Hi");
      // this.toast.warning("Hi Email or password wrong authentication,Please enter correct Email and Password");
    }
      
    })
  }

  get loginid() {return this.adminauth.get('loginid');}
  get password() {return this.adminauth.get('password');}

}
