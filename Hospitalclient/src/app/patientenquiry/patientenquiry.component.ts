import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  addharid:number=0;
  passwordmatch:any;
  idgen:number = 1;
  dubesi:number = 0;
  patientinquiryform:FormGroup;

  //Formgroup validation
  constructor(private validate:FormBuilder,private serverapi:ApiserviceService) { 
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
  ngOnInit(
   
  ): void {
  }
sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology"];

selected:string= "";
patientcount:any;
public updatetreatment(e:any)
{
  var genid;
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
        console.log("Form value added successfully into database");
        console.log("return response",res);
       
     
  }),((err)=>{
        console.log("Can't Store a Patient Data into Database",err);
  })
  this.patientinquiryform.reset();
  alert("Patient data successuly added");
  window.location.reload();
}
}

//Generate Patient Id autogenerate based upon aadhar No
setrequestid(event:any)
{
  var genid;
  this.addharid = event.target.value;
  genid = this.addharid;
  this.requestid = 'Patient-' + genid.slice(-4);
}

setesino(event:any)
{
  this.dubesi = event.target.value;
}
//Password check

passwordcheck(e:any)
{
  this.passwordmatch = e.target.value;
  console.log("password",this.passwordmatch);
}
//confirmpassword check
checkcpassword(e:any)
{
  this.cpasswordcheck = e.target.value;
  console.log("cpassword",this.cpasswordcheck);
  if(this.passwordmatch == this.cpasswordcheck)
  {
    this.validpass = true;
    console.log("True",this.validpass);
  }
  else
  {
    this.validpass = false;
    alert("Confirm Password doesn't Match with Orginal Password Please enter correctpassword");
    this.patientinquiryform.controls['cpassword'].setValue('');
  }
 
}

getToday(): string {
  return new Date().toISOString().split('T')[0]
}
//exists Emailid check
public emailcheck(event:any)
{
    var emailId = event.target.value;
    this.serverapi.checkpatientlogin(emailId).subscribe((data)=>{
        console.log("Patient Exists data from Database",data);
        console.log("Totallength",data.docs.length);
        for(var i=0;i<data.docs.length;i++)
        {
        if(data.docs[i].email == emailId )
        {
          alert("Email Id already Exists,Please register with new one");
        }
        else if((data.docs[i].esino == this.dubesi ) || (data.docs[i].aadharno == this.addharid))
        {
          alert("Esino or Aadhar No already Exists");
        }
        }
    })
    
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

