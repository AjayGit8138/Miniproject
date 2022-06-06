import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-doctoradmin',
  templateUrl: './doctoradmin.component.html',
  styleUrls: ['./doctoradmin.component.css']
})
export class DoctoradminComponent implements OnInit {
  doctoradmingroup:FormGroup;
  validpass:boolean;
  filename:string = "";
  passwordmatch:any;
  cpasswordcheck:any;
  certifyno:string = "DOC-";
  honourname:string = "DR.";
  profilepath:string = "../src/images/";
  sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology"];
  courses = ['MBBS,MD in Genereal Medicine','MBBS,MS in Obstetrics','MBBS,MD,DM in Cardiology','MBBS,MS,MCH in Vascular Surgery','MBBS in ENT (Ear, Nose and Throat)','MBBS in Ophthalmology','MBBS in General Medicine','MBBS in Orthopaedics','MBBS in General Surgery','MBBS in Anaesthesiology','MBBS in Obstetrics & Gynaecology','MBBS in Psychiatry','MBBS in Paediatrics']
  constructor(private fb:FormBuilder,private serveapi:ApiserviceService,private toastr:ToastrService) {
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
      console.log("Print Hello");
  }

  checkfile(event:any)
  {
    let fullPath = event;
    this.filename = `/src/images/`+ fullPath.replace(/^.*[\\\/]/, '');
   
  }
  navigatenext()
  {
    this.step += 1;
  }
  public emailcheck(event:any)
{
    let emailId = event.target.value;
    this.serveapi.checkdoctorlogin(emailId).subscribe((data)=>{
      
        if(data.data.docs[0].email == emailId)
        {
         
          this.showwarn("Email Id already Exists,Please register with new one");
          this.doctoradmingroup.reset();
        }
    })
}
passwordcheck(e:any)
{
  this.passwordmatch = e.target.value;

}
checkcpassword(e:any)
{
  this.cpasswordcheck = e.target.value;
 
  if(this.passwordmatch == this.cpasswordcheck)
  {
    this.validpass = true;
  
  }
  else
  {
    this.validpass = false;
    alert("Confirm Password doesn't Match with Orginal Password Please enter correctpassword");
    this.doctoradmingroup.controls['cpassword'].setValue('');
  }
}

getToday(): string {
  return new Date().toISOString().split('T')[0]
}
  doctorprofile(Formvalue:any)
  {
    Formvalue.profilesnap = this.filename;
    this.serveapi.storedoctorprofile(Formvalue).subscribe(resdata=>{
      
      if(resdata)
      {
        this.showsuccess("Doctor Profile is added succesfully")
      }
    })
    this.doctoradmingroup.reset();
  }

  //toastrservice
  showwarn(message)
  {
    this.toastr.warning(message);
  }
  showsuccess(message)
  {
    this.toastr.success(message);
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
