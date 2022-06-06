import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-patientsignup',
  templateUrl: './patientsignup.component.html',
  styleUrls: ['./patientsignup.component.css']
})
export class PatientsignupComponent implements OnInit {
  patientSignupform:FormGroup
  constructor(private request:FormBuilder) {

    this.patientSignupform = this.request.group({
      patientid:['',Validators.required],
      appointmentstatus:['',Validators.required],
      Symptoms:['',Validators.required]
    })
   }
  sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology"];
selected:string= "";
patientcount:any;
  ngOnInit(): void {
    console.log("Constructor")

  }
  public updateTreatment(e:any)
  {
   
    this.selected = e.target.value;
  }
  loginAuth(fromvalue:NgForm)
  {
      console.log("Formvalues",fromvalue);
  }
}
