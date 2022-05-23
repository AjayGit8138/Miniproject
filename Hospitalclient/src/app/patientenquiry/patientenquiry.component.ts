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
  addharid:number=0;
  idgen:number = 1;
  dubesi:number = 0;
  patientinquiryform:FormGroup;
  constructor(private validate:FormBuilder,private serverapi:ApiserviceService) { 
    this.patientinquiryform = this.validate.group({
      patientname:['',[Validators.required]],
      age:['',[Validators.required]],
      dateofbirth:['',[Validators.required]],
      mobileno:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      esino:['',[Validators.required,Validators.minLength(10)]],
      aadharno:['',[Validators.required,Validators.minLength(12)]],
      Treatmentcategory:['',[Validators.required]],
      requestId:['',[Validators.required]],
      category:['',Validators.required],
      password:['',Validators.required],
      cpassword:['',Validators.required],
      symptoms:['',[Validators.required]]

    })
 
  }
  selecttreatment:boolean = false;
  ngOnInit(
   
  ): void {
  }
sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology","MentalHealth"];
skin = ["Eczema","Cold Sores","Dry Skin","Psoriasis","Vitiligo","Contact Dermatitis","Rosacea","Melasma","Warts","Actinic Keratosis"];
Heart = ["Coronary Artery Disease (CAD)","Heart Arrhythmias","Heart Failure","Heart Valve Disease","Congenital Heart Disease","Cardiomyopathy (Heart Muscle Disease)","Pericardial Disease"];
Dental = ["Tooth Decay","Gum Disease","Bad Breath","Sensitive Teeth","Cracked or Broken Teeth","Receding Gums","Root Infection","Enamel Erosion","Dry Mouth","Teeth Grinding"];
selected:string= "";
patientcount:any;
public updatetreatment(e:any)
{
  var genid;
  
  this.selecttreatment = true;
  this.selected = e.target.value;
  genid = this.addharid;
  
  // this.serverapi.gettotalpatients(this.selected).subscribe(data=>{
    
  //  this.patientcount = data; 
  // this.requestid = this.selected + genid.slice(-4);

  //  console.log("from form ts file"+data);
  // })
  this.requestid = this.selected + genid.slice(-4);
  
  
  
  
}
Formsubmit(Formvalue:NgForm)
{
  console.log(Formvalue);
  this.serverapi.storepatientrecord(Formvalue).subscribe((res)=>{
        console.log("Form value added successfully into database");
        console.log("return response",res);
  })
  this.patientinquiryform.reset();
  alert("Patient data successuly added");
  window.location.reload();
  
  
}


setrequestid(event:any)
{
  this.addharid = event.target.value;
 
  console.log(this.requestid);
}

setesino(event:any)
{
  this.dubesi = event.target.value;
}

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
get patientname() {return this.patientinquiryform.get('patientname');}
get age() {return this.patientinquiryform.get('age');}
get dateofbirth() {return this.patientinquiryform.get('dateofbirth');}
get mobileno() {return this.patientinquiryform.get('mobileno');}
get email() {return this.patientinquiryform.get('email');}
get esino() {return this.patientinquiryform.get('esino');}
get category() {return this.patientinquiryform.get('category');}
}

