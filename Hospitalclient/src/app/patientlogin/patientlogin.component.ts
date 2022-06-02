import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';
import { PatienauthService } from '../shared/patienauth.service';


@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {
  patientloginform:FormGroup;
  
  constructor(private fb:FormBuilder,private serveapi:ApiserviceService,private router:Router,private activeparams:ActivatedRoute,private patientauth:PatienauthService,private toastrService:ToastrService) {
    this.patientloginform = this.fb.group({
      email:['',Validators.required],
      loginid:['',Validators.required],
      password:['',Validators.required]
    })
   }

  
  ngOnInit(): void {
    this.patientauth.logout();
  }
  get patientname() {return this.patientloginform.get('patientname');}
  get email() {return this.patientloginform.get('email');}
  get password() {return this.patientloginform.get('password');}
  get loginid() {return this.patientloginform.get('loginid');}


  //Login Authentication Check
  loginauth(loginval:any)
  {
    console.log("Login details",loginval);
    var searchobject = {
      "patientname":loginval.email,
      "loginid":loginval.loginid
      
    }
    
    console.log(searchobject);
    

    this.serveapi.checkpatientlogin(loginval.loginid).subscribe(data=>{
     
      console.log(data);
     
      if((data.data.docs[0].email == loginval.email) && (data.data.docs[0].password == loginval.password))
      {
        localStorage.setItem('isPatientloggedIn','true');
        localStorage.setItem('token', loginval.loginid);  
        this.showSuccess("Login Successfull")
        this.router.navigate(['patientdashboard/',loginval.loginid]);
      }
      else{
        this.showError("Login Authentication Failed Invalid Password or Email Error");
       
      }
    }),((err)=>{
      console.log("can't fetch data from the server",err);
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
