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
  doctorAdminGroup:FormGroup;
  validPass:boolean;
  fileName:string = "";
  passwordMatch:any;
  cpasswordCheck:any;
  certifyNo:string = "DOC-";
  honourName:string = "DR.";
  profilePath:string = "../src/images/";
  sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology"];
  courses = ['MBBS,MD in Genereal Medicine','MBBS,MS in Obstetrics','MBBS,MD,DM in Cardiology','MBBS,MS,MCH in Vascular Surgery','MBBS in ENT (Ear, Nose and Throat)','MBBS in Ophthalmology','MBBS in General Medicine','MBBS in Orthopaedics','MBBS in General Surgery','MBBS in Anaesthesiology','MBBS in Obstetrics & Gynaecology','MBBS in Psychiatry','MBBS in Paediatrics']
  constructor(private fbBuilder:FormBuilder,private serveApi:ApiserviceService,private toastrService:ToastrService) {
    this.doctorAdminGroup = this.fbBuilder.group({
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

  ngOnInit(): void {
      console.log("Print Hello");
  }

  checkFile(event:any)
  {
    let fullPath = event;
    this.fileName = `/src/images/`+ fullPath.replace(/^.*[\\\/]/, '');
   
  }
 
  public emailCheck(event:any)
{
    let emailId = event.target.value;
    this.serveApi.checkDoctorLogin(emailId).subscribe((data)=>{
      
        if(data.data.docs[0].email == emailId)
        {
         
          this.showWarn("Email Id already Exists,Please register with new one");
          this.doctorAdminGroup.reset();
        }
    })
}
passwordCheck(e:any)
{
  this.passwordMatch = e.target.value;

}
checkcPassword(e:any)
{
  this.cpasswordCheck = e.target.value;
 
  if(this.passwordMatch == this.cpasswordCheck)
  {
    this.validPass = true;
  
  }
  else
  {
    this.validPass = false;
    alert("Confirm Password doesn't Match with Orginal Password Please enter correctpassword");
    this.doctorAdminGroup.controls['cpassword'].setValue('');
  }
}

getToday(): string {
  return new Date().toISOString().split('T')[0]
}
  doctorProfile(Formvalue:any)
  {
    Formvalue.profilesnap = this.fileName;
    this.serveApi.storeDoctorProfile(Formvalue).subscribe(resdata=>{
      
      if(resdata)
      {
        this.showSuccess("Doctor Profile is added succesfully")
      }
    })
    this.doctorAdminGroup.reset();
  }

  //toastrservice
  showWarn(message:any)
  {
    this.toastrService.warning(message);
  }
  showSuccess(message:any)
  {
    this.toastrService.success(message);
  }
  get doctorname() {return this.doctorAdminGroup.get('doctorname');}
  get email() {return this.doctorAdminGroup.get('email');}
  get mobileno() {return this.doctorAdminGroup.get('mobileno');}
  get gender() {return this.doctorAdminGroup.get('gender');}
  get dateofbirth() {return this.doctorAdminGroup.get('dateofbirth');}
  get  profilesnap() {return this.doctorAdminGroup.get('profilesnap');}
  get  certificateid() {return this.doctorAdminGroup.get(' certificateid');}
  get  cspecialistdeg() {return this.doctorAdminGroup.get('specialistdeg');}
  get  password() {return this.doctorAdminGroup.get('password');}
  get  cpassword() {return this.doctorAdminGroup.get('cpassword');}
}
