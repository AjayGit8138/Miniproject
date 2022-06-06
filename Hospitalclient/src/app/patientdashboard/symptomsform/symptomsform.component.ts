import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-symptomsform',
  templateUrl: './symptomsform.component.html',
  styleUrls: ['./symptomsform.component.css']
})
export class SymptomsformComponent implements OnInit {
  patientSignupForm:FormGroup;
  currentPage= {id:'number',name:'string'};
  status = 'NO';
  constructor(private toastrService:ToastrService,private request:FormBuilder,private activeParams:ActivatedRoute,private apiService:ApiserviceService) { 
    this.patientSignupForm = this.request.group({
      patientid:['',Validators.required],
      patientname:['',Validators.required],
      appointmentstatus:['',Validators.required],
      email:['',Validators.required],
      Symptoms:['',Validators.required]
    })

    this.activeParams.params.subscribe((data:Params)=>{
      this.currentPage = {
        id:data['id'],
        name:data['name']
      }
      console.log(this.currentPage.name);
    })
    this.patientSignupForm.controls['patientid'].setValue(this.currentPage.id);
    this.patientSignupForm.controls['patientname'].setValue(this.currentPage.name);
  }

  ngOnInit(): void {
    console.log("Constructor")
  
  }
  symptomsForm(fromValue:NgForm)
  {
     
      this.apiService.postConsulting(fromValue).subscribe((data)=>{
       
        this.showSuccess(data.message);
        this.patientSignupForm.reset();
      })
  }

  showSuccess(message:any)
  {
    this.toastrService.success(message);
  }
}
