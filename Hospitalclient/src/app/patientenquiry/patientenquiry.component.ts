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
  requestId:string="undefined";
  type:string = "patient";
  validPass:boolean;
  cpasswordCheck:any;
  checkMobileno:any;
  addharId:number=0;
  passwordMatch:any;
  idGen:number = 1;
  dubEsi:number = 0;
  patientinQuiryform:FormGroup;

  //Formgroup validation
  constructor(private routerService:Router,private validateForm:FormBuilder,private serverApi:ApiserviceService,private toastrService:ToastrService) { 
    this.patientinQuiryform = this.validateForm.group({
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
  selectTreatment:boolean = false;
  ngOnInit(): void {
    console.log("Constructor")

}


selected:string= "";
patientCount:any;



//store Patient Data into the Database
formSubmit(formValue:NgForm)
{
  console.log(formValue);
  if(formValue.value == '')
  {
      alert("Please fill the form")
  }
  else{
  this.serverApi.storePatientRecord(formValue).subscribe((res)=>{
        this.showSuccess(res.message);
  })
  this.patientinQuiryform.reset();
  window.location.reload();
}
}

//Generate Patient Id autogenerate based upon aadhar No
setRequestid(event:any)
{
  let genId;
  this.addharId = event.target.value;
  genId = this.addharId;
  this.requestId = 'Patient-' + genId.slice(-4);
}

//checkmobileno
setMobileno(event:any)
{
  this.checkMobileno = event.target.value;

}
setEsino(event:any)
{
  this.dubEsi = event.target.value;
}
//Password check

passwordCheck(e:any)
{
  this.passwordMatch = e.target.value;
  console.log("password",this.passwordMatch);}
//confirmpassword check
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
    this.patientinQuiryform.controls['cpassword'].setValue('');
  }
 
}

//toastr message
  showSuccess(message)
  {
    this.toastrService.success(message);
  }

getToday(): string {
  return new Date().toISOString().split('T')[0]
}
//exists Emailid check
public emailCheck(event:any)
{
    let emailId = event.target.value;
    this.serverApi.checkPatientLogin(emailId).subscribe((data)=>{
        console.log("Patient Exists data from Database",data);
        
        for(const element of data.data.docs)
        {
        if(element.email == emailId )
        {
          this.showWarn("Email Id already Exists,Please register with new one");
          this.patientinQuiryform.controls['email'].setValue('');
        }
        else if((element.esino == this.dubEsi ))
        {
          this.showWarn("Esino Already Exists");
          this.patientinQuiryform.controls['esino'].setValue('');
        }
        else if((element.aadharno == this.addharId))
        {
          this.showWarn("aadharno Exists");
          this.patientinQuiryform.controls['aadharno'].setValue('');
        }
        else if((element.mobileno == this.checkMobileno ))
        {
          this.showWarn("Mobileno Exists");
          this.patientinQuiryform.controls['mobileno'].setValue('');

        }
       
        }
    })
    
}
//toastr service
showWarn(message:any)
{
  this.toastrService.warning(message);
}

//getter setter for form validation
get patientname() {return this.patientinQuiryform.get('patientname');}
get age() {return this.patientinQuiryform.get('age');}
get dateofbirth() {return this.patientinQuiryform.get('dateofbirth');}
get mobileno() {return this.patientinQuiryform.get('mobileno');}
get email() {return this.patientinQuiryform.get('email');}
get esino() {return this.patientinQuiryform.get('esino');}
get aadharno() {return this.patientinQuiryform.get('aadharno');}
get category() {return this.patientinQuiryform.get('category');}
get password() {return this.patientinQuiryform.get('password');}
get cpassword() {return this.patientinQuiryform.get('cpassword');}

}

