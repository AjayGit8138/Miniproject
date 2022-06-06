import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { PatienauthService } from '../shared/patienauth.service';

@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.css']
})
export class PatientdashboardComponent implements OnInit {
  currentPage= {id:'number'};
  loginPatientId:any;
  appointStatus:any = [];
  divBoolean:any;
  testReport:any;
  patientTestReports = [];
  numberCount:number = 1;
  closeResult = '';
  showRecord:number = 1;
  patientName:any;

  showObject = {
    symptoms:'',
    remedies:'',
    tabletone:'',
    tablettwo:'',
    tabletthree:'',
    dietplan:'',
    dosage:''

  }
  
  constructor(private modalService: NgbModal,private activeParams:ActivatedRoute,private serviceApi:ApiserviceService,private routeService:Router,private patientAuth:PatienauthService) { 
    this.activeParams.params.subscribe((data:Params)=>{
      this.currentPage = {
        id:data['id'],
      }
    })

    this.testReport = this.currentPage.id + '-'+ 'Testreport' + '-' + 1;
    this.autoCode(this.testReport);
    this.serviceApi.checkPatientLogin(this.currentPage.id).subscribe((data)=>{
        this.appointStatus.push(data.data.docs[0]);
        for(const element of this.appointStatus)
        {
            
              localStorage.setItem('patientdbid',element._id)
              this.patientName = element.patientname;
        }
      
        
    },(err)=>{
      console.log("Bad response from the server",err);
    })
   
  }

  open(content:any,_row:any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })

  }

  autoCode(params:any)
  {
    this.serviceApi.getTestReport(this.testReport).subscribe((response)=>{
      if(params == response.data.docs[0].totalreport)
      {
        this.numberCount += 1;
        this.patientTestReports.push(response.data.docs[0]);
        this.testReport = this.currentPage.id + '-' + 'Testreport' + '-' + this.numberCount;

      }
      else{
        console.log("Not matched id",params);
      }
      this.autoCode(this.testReport);
        
    })
  }

  redirectBack()
  {
      this.routeService.navigate(['..']);
  }
  showDiv(currentdiv:any)
  {
    this.divBoolean = currentdiv;
  }
  displayTestReport(items:any,disval:any)
  {
    this.showObject.dietplan = items.dietplan;
    this.showObject.tabletone = items.medicineone;
    this.showObject.tablettwo = items.medicinetwo;
    this.showObject.tabletthree = items.medicinethree;
    this.showObject.remedies = items.remedies;
    this.showObject.dosage = items.dosage;

    this.divBoolean = disval;
  }
  ngOnInit(): void {
    this.divBoolean = 1;
    this.loginPatientId = localStorage.getItem('token');
  }
  logOut() {  
    console.log('logout');  
    this.patientAuth.logout();  
    this.routeService.navigate(['home']);  
  } 
}
