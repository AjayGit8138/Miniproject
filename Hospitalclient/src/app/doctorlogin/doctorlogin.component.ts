import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.component.html',
  styleUrls: ['./doctorlogin.component.css']
})
export class DoctorloginComponent implements OnInit {
  doctorloginformgroup:FormGroup;
  constructor(private fb:FormBuilder) {
    this.doctorloginformgroup = this.fb.group({
      loginid:['',Validators.required],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
get loginid(){return this.doctorloginformgroup.get('loginid');}
get email(){return this.doctorloginformgroup.get('email');}
}
