import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-displayreport',
  templateUrl: './displayreport.component.html',
  styleUrls: ['./displayreport.component.css']
})
export class DisplayreportComponent implements OnInit {
  currentPage= {id:'number'};
  
  appointStatus:any = [];
  divBoolean:number = 1;
  testReport:any;
  patientTestReports = [];
  numberCount:number = 1;
  closeResult = '';
  showRecord:number = 1;

  showObject = {
    symptoms:'',
    remedies:'',
    tabletone:'',
    tablettwo:'',
    tabletthree:'',
    dietplan:'',
    dosage:'',
    filename:''

  }
  
  constructor(private modalService: NgbModal,private activeParams:ActivatedRoute,private routeService:Router,private serveApi:ApiserviceService) { 
    this.activeParams.params.subscribe((data:Params)=>{
      this.currentPage = {
        id:data['id'],
       
      }
 
    })

    this.testReport = this.currentPage.id + '-'+ 'Testreport' + '-' + 1;
    this.autoCode(this.testReport);
  


    this.serveApi.checkPatientLogin(this.currentPage.id).subscribe((data)=>{
       
        this.appointStatus.push(data.docs[0]);
      
    },(err)=>{
      console.log("Bad response from the server",err);
    })
   
  }
  displayTestReport(items:any,disval:any)
  {
    
   
    this.showObject.dietplan = items.dietplan;
    this.showObject.tabletone = items.medicineone;
    this.showObject.tablettwo = items.medicinetwo;
    this.showObject.tabletthree = items.medicinethree;
    this.showObject.remedies = items.remedies;
    this.showObject.dosage = items.dosage;
    this.showObject.filename = items.filename;
    
    this.divBoolean = disval;
  }
  ngOnInit(): void {
    this.divBoolean = 1;
  }

  showDiv(setdisplay:any)
  {
    this.divBoolean = setdisplay;
  }
  viewReports(params:any)
  {
    this.divBoolean = params;
  }

  downLoad(event:any)
  {
    let item = event;
  this.serveApi.getFile(item).subscribe((data)=>{
    if(data)
    {
    saveAs(data,item);
    }
    else{
      alert("No records found");
    }
  })
  }

  exit()
  {
    this.divBoolean = 1;
  }
  autoCode(params:any)
  {
    this.serveApi.getTestReport(this.testReport).subscribe((response)=>{
     console.log("testreports",response.data.docs);
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

}
