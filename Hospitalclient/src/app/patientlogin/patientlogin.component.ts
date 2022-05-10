import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {
  patientloginform:FormGroup
  constructor(private fb:FormBuilder,private serveapi:ApiserviceService) {

    // this.serveapi.getconnection();
    this.patientloginform = this.fb.group({
      patientname:['',Validators.required],
      email:['',Validators.required,Validators.email],
      loginid:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
  get patientname() {return this.patientloginform.get('patientname');}
  get email() {return this.patientloginform.get('email');}
  get password() {return this.patientloginform.get('password');}
  get loginid() {return this.patientloginform.get('loginid');}
  
}
