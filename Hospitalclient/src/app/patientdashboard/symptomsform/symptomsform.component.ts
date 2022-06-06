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
  patientsignupform:FormGroup;
  currentpage= {id:'number',name:'string'};
  status = 'NO';
  constructor(private toastr:ToastrService,private request:FormBuilder,private activeparams:ActivatedRoute,private api:ApiserviceService) { 
    this.patientsignupform = this.request.group({
      patientid:['',Validators.required],
      patientname:['',Validators.required],
      appointmentstatus:['',Validators.required],
      email:['',Validators.required],
      Symptoms:['',Validators.required]
    })

    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
        name:data['name']
      }
      console.log(this.currentpage.name);
    })
    this.patientsignupform.controls['patientid'].setValue(this.currentpage.id);
    this.patientsignupform.controls['patientname'].setValue(this.currentpage.name);
  }

  ngOnInit(): void {
    console.log("Constructor")
  
  }
  loginauth(fromvalue:NgForm)
  {
     
      this.api.postconsulting(fromvalue).subscribe((data)=>{
       
        this.showsuccess(data.message);
        this.patientsignupform.reset();
      })
  }

  showsuccess(message)
  {
    this.toastr.success(message);
  }
}
