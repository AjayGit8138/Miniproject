import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-patientenquiry',
  templateUrl: './patientenquiry.component.html',
  styleUrls: ['./patientenquiry.component.css']
})
export class PatientenquiryComponent implements OnInit {
  requestid:string="undefined";
  type:string = "patient";
  validpass:boolean;
  cpasswordcheck:any;
  checkmobileno:any;
  addharid:number=0;
  passwordmatch:any;
  idgen:number = 1;
  dubesi:number = 0;
  patientinquiryform:FormGroup;

  //Formgroup validation
  constructor(private router:Router,private validate:FormBuilder,private serverapi:ApiserviceService,private toastr:ToastrService) { 
    this.patientinquiryform = this.validate.group({
      patientname:['',[Validators.required]],
      age:['',[Validators.required]],
      dateofbirth:['',[Validators.required]],
      mobileno:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      esino:['',[Validators.required,Validators.minLength(10)]],
      aadharno:['',[Validators.required,Validators.max(12)]],
     
      requestId:['',[Validators.required]],
     
      password:['',Validators.required],
      cpassword:['',Validators.required],
     

    })
 
  }
  selecttreatment:boolean = false;
  ngOnInit(): void {
    console.log("Constructor")

}


selected:string= "";
patientcount:any;
public updatetreatment()
{
  let genid;
  genid = this.addharid;
  this.requestid = 'patient' + genid.slice(-4);
}



//store Patient Data into the Database
Formsubmit(Formvalue:NgForm)
{
  console.log(Formvalue);
  if(Formvalue.value == '')
  {
      alert("Please fill the form")
  }
  else{
  this.serverapi.storepatientrecord(Formvalue).subscribe((res)=>{
        this.showsuccess(res.message);
  })
  this.patientinquiryform.reset();
  window.location.reload();
}
}

//Generate Patient Id autogenerate based upon aadhar No
setrequestid(event:any)
{
  let genid;
  this.addharid = event.target.value;
  genid = this.addharid;
  this.requestid = 'Patient-' + genid.slice(-4);
}

//checkmobileno
setmobileno(event:any)
{
  this.checkmobileno = event.target.value;

}
setesino(event:any)
{
  this.dubesi = event.target.value;
}
//Password check

passwordcheck(e:any)
{
  this.passwordmatch = e.target.value;
  console.log("password",this.passwordmatch);}
//confirmpassword check
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
    this.patientinquiryform.controls['cpassword'].setValue('');
  }
 
}

//toastr message
  showsuccess(message)
  {
    this.toastr.success(message);
  }

getToday(): string {
  return new Date().toISOString().split('T')[0]
}
//exists Emailid check
public emailcheck(event:any)
{
    let emailId = event.target.value;
    this.serverapi.checkpatientlogin(emailId).subscribe((data)=>{
        console.log("Patient Exists data from Database",data);
        
        for(const element of data.data.docs)
        {
        if(element.email == emailId )
        {
          this.showwarn("Email Id already Exists,Please register with new one");
          this.patientinquiryform.controls['email'].setValue('');
        }
        else if((element.esino == this.dubesi ))
        {
          this.showwarn("Esino Already Exists");
          this.patientinquiryform.controls['esino'].setValue('');
        }
        else if((element.aadharno == this.addharid))
        {
          this.showwarn("aadharno Exists");
          this.patientinquiryform.controls['aadharno'].setValue('');
        }
        else if((element.mobileno == this.checkmobileno ))
        {
          this.showwarn("Mobileno Exists");
          this.patientinquiryform.controls['mobileno'].setValue('');

        }
       
        }
    })
    
}
//toastr service
showwarn(message)
{
  this.toastr.warning(message);
}

//getter setter for form validation
get patientname() {return this.patientinquiryform.get('patientname');}
get age() {return this.patientinquiryform.get('age');}
get dateofbirth() {return this.patientinquiryform.get('dateofbirth');}
get mobileno() {return this.patientinquiryform.get('mobileno');}
get email() {return this.patientinquiryform.get('email');}
get esino() {return this.patientinquiryform.get('esino');}
get aadharno() {return this.patientinquiryform.get('aadharno');}
get category() {return this.patientinquiryform.get('category');}
get password() {return this.patientinquiryform.get('password');}
get cpassword() {return this.patientinquiryform.get('cpassword');}

}

