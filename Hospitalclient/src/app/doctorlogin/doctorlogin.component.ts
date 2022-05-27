import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiserviceService } from '../apiservice.service';
import { AuthService } from '../shared/auth.service';
import { DoctorauthService } from '../shared/doctorauth.service';

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.component.html',
  styleUrls: ['./doctorlogin.component.css']
})
export class DoctorloginComponent implements OnInit {
  doctorloginformgroup:FormGroup;
  constructor(private fb:FormBuilder,private serveapi:ApiserviceService,private router:Router,private toast:ToastrService,private doctorauth:DoctorauthService) {
    this.doctorloginformgroup = this.fb.group({
      loginid:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.showSuccess();
    this.doctorauth. doctorlogout();
  }
get loginid(){return this.doctorloginformgroup.get('loginid');}
get email(){return this.doctorloginformgroup.get('email');}


showError() {
  this.toast.error('everything is broken', 'Major Error', {
  timeOut: 3000
});

}
warning(message:any)
{
  this.toast.warning(message);
}

showSuccess() {
  this.toast.success('Hello world!', 'Toastr fun!');
}

doctorloginauth(loginval:any)
{
  this.serveapi.checkdoctorlogin(loginval.email).subscribe((data)=>{
    console.log("Data search successfully returned",data);
    var length = data.docs;
    console.log("total length",length);
  
    
    if((data.docs[0].email == loginval.email) && (data.docs[0].password == loginval.password))
    {
      localStorage.setItem('isdoctorLoggedIn','true');
        localStorage.setItem('token', loginval.loginid);  
      this.router.navigate(['treat/mypatient',loginval.loginid]);
    }
    else{
      this.warning("authentication failed");
      alert("Error Email or Password authentication failed!!!!");
      // this.toast.success("Hi");
      // this.toast.warning("Hi Email or password wrong authentication,Please enter correct Email and Password");
    }
  
  })
}
}
