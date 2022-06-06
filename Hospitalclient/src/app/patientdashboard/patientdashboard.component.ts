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
  currentpage= {id:'number'};
  loginpatientid:any;
  appointstatus:any = [];
  divBoolean:any;
  testreport:any;
  patienttestreports = [];
  numbercount:number = 1;
  closeResult = '';
  showrecord:number = 1;
  patientname:any;

  showobject = {
    symptoms:'',
    remedies:'',
    tabletone:'',
    tablettwo:'',
    tabletthree:'',
    dietplan:'',
    dosage:''

  }
  
  constructor(private modalService: NgbModal,private activeparams:ActivatedRoute,private serviceapi:ApiserviceService,private route:Router,private serveapi:ApiserviceService,private patientauth:PatienauthService) { 
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
      }
      console.log(this.currentpage);
    })

    this.testreport = this.currentpage.id + '-'+ 'Testreport' + '-' + 1;
    this.autocode(this.testreport);
    this.serviceapi.checkpatientlogin(this.currentpage.id).subscribe((data)=>{
        this.appointstatus.push(data.data.docs[0]);
        for(const element of this.appointstatus)
        {
            
              localStorage.setItem('patientdbid',element._id)
              this.patientname = element.patientname;
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

  autocode(params:any)
  {
    this.serveapi.gettestreport(this.testreport).subscribe((response)=>{
      if(params == response.data.docs[0].totalreport)
      {
        this.numbercount += 1;
        this.patienttestreports.push(response.data.docs[0]);
        this.testreport = this.currentpage.id + '-' + 'Testreport' + '-' + this.numbercount;

      }
      else{
        console.log("Not matched id",params);
      }
      this.autocode(this.testreport);
        
    })
  }

  redirectback()
  {
      this.route.navigate(['..']);
  }
  showdiv(currentdiv:any)
  {
    this.divBoolean = currentdiv;
  }
  displaytestreport(items:any,disval:any)
  {
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
    this.loginpatientid = localStorage.getItem('token');
  }
  Logout() {  
    console.log('logout');  
    this.patientauth.logout();  
    this.route.navigate(['home']);  
  } 
}
