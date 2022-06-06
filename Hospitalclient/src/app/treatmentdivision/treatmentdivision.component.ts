import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

import { DoctorauthService } from '../shared/doctorauth.service';

@Component({
  selector: 'app-treatmentdivision',
  templateUrl: './treatmentdivision.component.html',
  styleUrls: ['./treatmentdivision.component.css']
})
export class TreatmentdivisionComponent implements OnInit {
  currentPage= {id:'number'};
  loginDocId:any;
  tabChange:any;
  setDivision:number = 1;
  underTreatment = {
    doctor:'',
    treatmentCategory:''

  };
  mypatients = [];
  constructor(private activeParams:ActivatedRoute,private serveApi:ApiserviceService,private routeService:Router,private authServe:DoctorauthService) {
    this.activeParams.params.subscribe((data:Params)=>{
      this.currentPage = {
        id:data['id'],
       
      }
      console.log("currentpate treat",this.currentPage);
     
    })
          
   }
  ngOnInit(): void {
   this.tabChange = 1;
   this.loginDocId = localStorage.getItem('token');
  }

  tabselect(params:any)
  {
    this.tabChange = params;
    this.getdetail();
  }

 
  
  gettreatmentlist(){
    this.getdetail();
  }
  getdetail()
  {
    this.serveApi.getTotalPatients(this.underTreatment.doctor,this.underTreatment.treatmentCategory).subscribe((data)=>{
      //get patients details working under doctor
      for(const element of data.docs)
      {
        this.mypatients.push(element);
      }
    })

  }
 
  doctorLogout() {  
   
    this.authServe.doctorLogout();  
    this.routeService.navigate(['/home']);  
  } 

  selectab(divSelect:any)
  {
    this.tabChange = divSelect;
  }

  mobileView()
  {
  let menu = document.querySelector('#menu-btn');
  let navbar = document.querySelector('.navbar');

     menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  }
}
