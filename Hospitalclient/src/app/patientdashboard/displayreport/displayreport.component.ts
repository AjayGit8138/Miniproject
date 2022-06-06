import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-displayreport',
  templateUrl: './displayreport.component.html',
  styleUrls: ['./displayreport.component.css']
})
export class DisplayreportComponent implements OnInit {
  currentpage= {id:'number'};
  appointstatus:any = [];
  divBoolean:number = 1;
  testreport:any;
  patienttestreports = [];
  numbercount:number = 1;
  closeResult = '';
  showrecord:number = 1;

  showobject = {
    symptoms:'',
    remedies:'',
    tabletone:'',
    tablettwo:'',
    tabletthree:'',
    dietplan:'',
    dosage:''

  }
  
  constructor(private modalService: NgbModal,private activeparams:ActivatedRoute,private serviceapi:ApiserviceService,private route:Router,private serveapi:ApiserviceService) { 
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
       
      }
      console.log(this.currentpage);
    })

    this.testreport = this.currentpage.id + '-'+ 'Testreport' + '-' + 1;
    this.autocode(this.testreport);
    console.log("Testreports",this.testreport);


    this.serviceapi.checkpatientlogin(this.currentpage.id).subscribe((data)=>{
        console.log("session login data for patient",data);
        this.appointstatus.push(data.docs[0]);
        console.log("appointment status",this.appointstatus);
    },(err)=>{
      console.log("Bad response from the server",err);
    })
   
  }
  displaytestreport(items:any,disval:any)
  {
    
    console.log("items to display",items);
    this.showobject.dietplan = items.dietplan;
    this.showobject.tabletone = items.medicineone;
    this.showobject.tablettwo = items.medicinetwo;
    this.showobject.tabletthree = items.medicinethree;
    this.showobject.remedies = items.remedies;
    this.showobject.dosage = items.dosage;

    this.divBoolean = disval;
  }
  ngOnInit(): void {
    this.divBoolean = 1;
  }

  showdiv(setdisplay:any)
  {
    this.divBoolean = setdisplay;
  }
  viewreports(params:any)
  {
    this.divBoolean = params;
  }

  exit()
  {
    this.divBoolean = 1;
  }
  autocode(params:any)
  {
    this.serveapi.gettestreport(this.testreport).subscribe((response)=>{
      console.log("autogenerate reports",response);
      if(params == response.data.docs[0].totalreport)
      {
        console.log('matched');
        this.numbercount += 1;
        console.log("counts",this.numbercount);
        this.patienttestreports.push(response.data.docs[0]);
        console.log("Need to show the output for patient",this.patienttestreports);
        this.testreport = this.currentpage.id + '-' + 'Testreport' + '-' + this.numbercount;

      }
      else{
        console.log("Not matched id",params);
      }
      this.autocode(this.testreport);
        
    })
  }

}
