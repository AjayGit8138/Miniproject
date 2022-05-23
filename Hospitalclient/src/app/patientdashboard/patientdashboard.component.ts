import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OperationPipe } from '../operation.pipe';

@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.css']
})
export class PatientdashboardComponent implements OnInit {
  currentpage= {id:'number'};
  appointstatus:any = [];
  divBoolean:any;
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
        for(var i=0;i<this.appointstatus.length;i++)
        {
              console.log(this.appointstatus[i]);
        }
      
        
    })
   
  }

  open(content:any,row:any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })
    console.log("row details",row);

  }

  autocode(params:any)
  {
    this.serveapi.gettestreport(this.testreport).subscribe((response)=>{
      console.log("autogenerate reports",response);
      if(params == response.docs[0].totalreport)
      {
        console.log('matched');
        this.numbercount += 1;
        console.log("counts",this.numbercount);
        this.patienttestreports.push(response.docs[0]);
        console.log("Need to show the output for patient",this.patienttestreports);
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
  }

}
