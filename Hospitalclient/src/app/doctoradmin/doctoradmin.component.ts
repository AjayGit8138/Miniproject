import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-doctoradmin',
  templateUrl: './doctoradmin.component.html',
  styleUrls: ['./doctoradmin.component.css']
})
export class DoctoradminComponent implements OnInit {
  doctoradmingroup:FormGroup;
  filename:string = "";
  certifyno:string = "DOC-";
  honourname:string = "DR.";
  profilepath:string = "../src/images/";
  sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology","MentalHealth"];
  courses = ['MBBS,MD in Genereal Medicine','MBBS,MS in Obstetrics','MBBS,MD,DM in Cardiology','MBBS,MS,MCH in Vascular Surgery','MBBS in ENT (Ear, Nose and Throat)','MBBS in Ophthalmology','MBBS in General Medicine','MBBS in Orthopaedics','MBBS in General Surgery','MBBS in Anaesthesiology','MBBS in Obstetrics & Gynaecology','MBBS in Psychiatry','MBBS in Paediatrics']
  constructor(private fb:FormBuilder,private serveapi:ApiserviceService) {
    this.doctoradmingroup = this.fb.group({
      doctorname:['',[Validators.required]],
      email:['',[Validators.required]],
      mobileno:['',[Validators.required]],
      gender:['',[Validators.required]],

      dateofbirth:['',[Validators.required]],
      profilesnap:['',[Validators.required]],
      certificateid:['',[Validators.required]],
      specialist:['',[Validators.required]],
      specialistdeg:['',[Validators.required]],
      password:['',[Validators.required]],
      cpassword:['',[Validators.required]]

    })

   }
  step:any = 1;
  ngOnInit(): void {
  }

  checkfile(event:any)
  {
    var fullPath = event;
    this.filename = `/src/images/`+ fullPath.replace(/^.*[\\\/]/, '');
    console.log("Hi File name is:", `/src/images/` + this.filename);
  }
  navigatenext()
  {
    this.step += 1;
  }
  public emailcheck(event:any)
{
    var emailId = event.target.value;
    this.serveapi.checkdoctorlogin(emailId).subscribe((data)=>{
        console.log("Patient Exists data from Database",data);
        if(data.docs[0].email == emailId)
        {
          alert("Email Id already Exists,Please register with new one");
        }
    })
    
}
  doctorprofile(Formvalue:any)
  {
    Formvalue.profilesnap = this.filename;
    this.serveapi.storedoctorprofile(Formvalue).subscribe(resdata=>{
      console.log("Hi doctor information is inserted",resdata);
      alert("Doctor Profile is added succesfully");
    })
    this.doctoradmingroup.reset();
    alert("Doctor Profile is added succesfully");
    console.log(Formvalue);
  }

  get doctorname() {return this.doctoradmingroup.get('doctorname');}
  get email() {return this.doctoradmingroup.get('email');}
  get mobileno() {return this.doctoradmingroup.get('mobileno');}
  get gender() {return this.doctoradmingroup.get('gender');}
  get dateofbirth() {return this.doctoradmingroup.get('dateofbirth');}
  get  profilesnap() {return this.doctoradmingroup.get('profilesnap');}
  get  certificateid() {return this.doctoradmingroup.get(' certificateid');}
  get  cspecialistdeg() {return this.doctoradmingroup.get('specialistdeg');}
  get  password() {return this.doctoradmingroup.get('password');}
  get  cpassword() {return this.doctoradmingroup.get('cpassword');}






}
