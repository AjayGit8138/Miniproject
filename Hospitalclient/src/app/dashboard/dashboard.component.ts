import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';
declare var $: any;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bookingform:FormGroup;
  patientrequest = [];
  closeResult = '';
  status:any = "YES";
  timeclock:any;
  constructor(private toastr:ToastrService,private serveapi:ApiserviceService,private modalService: NgbModal,private bookform:FormBuilder) { 
    this.bookingform = this.bookform.group({
        requestId:['',Validators.required],
        patientname:['',Validators.required],
        Treatmentcategory:['',Validators.required],
        appointstatus:['',Validators.required],
        assigndoctor:['',Validators.required],
        dateofappointment:['',Validators.required],
        timingforappointment:['',Validators.required]
    })
  }
  number:any;
  sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology","MentalHealth"];
  skindoctors = ["karthick","Ramamoorthy","ramachandran","geetha","srinivasan"];
  ngOnInit(): void {
  }
  display(tab:any)
  {
    
    this.number = tab;
    if(tab == 1)
    {
      this.serveapi.getrequestedpatient().subscribe((data)=>{
        console.log("waiting for Doctor appointment",data.docs);
        var availength = data.docs.length;
        console.log("returned Length",availength);
        for(var i=0;i<availength;i++)
        {
          this.patientrequest.push(data.docs[i]);
        }
       
        console.log("patient request",this.patientrequest);
      })
    }
  }

  open(content,row:any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })
    console.log(row);
    console.log(row.patientname);
    this.bookingform.controls['requestId'].setValue(row.requestId);
    this.bookingform.controls['patientname'].setValue(row.patientname);
    this.bookingform.controls['Treatmentcategory'].setValue(row.Treatmentcategory);
    this.bookingform.controls['appointstatus'].setValue(this.status);
    }

    savebookingstatus(bookinformation:any){
        console.log(bookinformation);
        bookinformation.timingforappointment = this.timeclock;
        this.serveapi.bookappointment(bookinformation).subscribe((data)=>{
          console.log("Updated patient data is successfully loaded:",data);
        }),((err)=>{
          console.log("something Bad request data is not stored Properly into database");
        })
    }


    get requestId() {return this.bookingform.get('requestId');}
    get dateofappointment() {return this.bookingform.get('dateofappointment');}
    get Treatmentcategory() {return this.bookingform.get('Treatmentcategory');}
    get appointstatus() {return this.bookingform.get('appointstatus');}
    get assigndoctor() {return this.bookingform.get('assigndoctor');}
    get timingforappointment() {return this.bookingform.get('timingforappointment');}


   
  timeformat()
  {
    var timeinput = document.getElementById('timeinput') as HTMLInputElement;
    var timeSplit = timeinput.value.split(':'),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }
  this.timeclock = hours + ':' + minutes + ' ' + meridian;
  }


    
  }



