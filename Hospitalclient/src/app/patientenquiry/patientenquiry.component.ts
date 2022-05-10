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
  addharid:number=0;
  idgen:number = 1;
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
      symptoms:['',[Validators.required]]

    })
  }
  selecttreatment:boolean = false;
  ngOnInit(): void {
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
  
  this.serverapi.gettotalpatients(this.selected).subscribe(data=>{
   this.patientcount = data; 
  this.requestid = this.selected + genid.slice(-4) + 'P-' + this.patientcount;

   console.log(data);
  })
  
  
  
  
}
Formsubmit(Formvalue:NgForm)
{
  console.log(Formvalue);
  
}


setrequestid(event:any)
{
  this.addharid = event.target.value;
 
  console.log(this.requestid);
}

public emailcheck(event:any)
{

}
get patientname() {return this.patientinquiryform.get('patientname');}
get age() {return this.patientinquiryform.get('age');}
get dateofbirth() {return this.patientinquiryform.get('dateofbirth');}
get mobileno() {return this.patientinquiryform.get('mobileno');}
get email() {return this.patientinquiryform.get('email');}
get esino() {return this.patientinquiryform.get('esino');}
}

