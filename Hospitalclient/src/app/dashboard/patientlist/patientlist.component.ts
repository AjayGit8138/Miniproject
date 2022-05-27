import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  bookingform:FormGroup;
  patientrequest = [];
  doctorlist = [];
  employeddoctors = [];
  closeResult = '';
  doctorsobject = {};
  goodresponse = [];
  status:any = "YES";
  timeclock:any;
  doctors:any;
  content = '';
  //for update new method
  patientid:any;
  patientrefid:any;
  constructor(private serveapi:ApiserviceService,private modalService: NgbModal,private bookform:FormBuilder,private route:Router) {
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
   num = 1;
   orthodoctors = [];
   sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology","MentalHealth"];
   skindoctors = ["karthick","Ramamoorthy","ramachandran","geetha","srinivasan"];
  ngOnInit(): void {

    this.number = 1;

    this.serveapi.getrequestedpatient().subscribe((data)=>{
      console.log("waiting for Doctor appointment",data.docs);
      var availength = data.docs.length;
      console.log("returned Length",availength);
      this.patientrequest = [];
      for(var i=0;i<availength;i++)
      {
        this.patientrequest.push(data.docs[i]);
      }
     
      console.log("patient request",this.patientrequest);
    })
  }

  savebookingstatus(bookinformation:any){
    console.log(bookinformation);
    bookinformation.timingforappointment = this.timeclock;
    this.serveapi.bookappointment(bookinformation,this.patientid).subscribe((data)=>{
      console.log("Updated patient data is successfully loaded:",data);
      alert(data.message);
      window.location.reload();
    }),((err)=>{
      console.log("something Bad request data is not stored Properly into database");
    })
}
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

  open(content:any,row:any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })
    console.log(row);
    console.log(row.patientname);
    console.log(row._id);
    this.patientid = row._id;
    this.patientrefid = row._rev;
    console.log(row._rev);

    this.bookingform.controls['requestId'].setValue(row.requestId);
    this.bookingform.controls['patientname'].setValue(row.patientname);
    this.bookingform.controls['Treatmentcategory'].setValue(row.Treatmentcategory);
    this.bookingform.controls['appointstatus'].setValue(this.status);
    this.doctors = row.Treatmentcategory;

    this.serveapi.getdoctorslist(this.doctors).subscribe((data)=>{
      console.log("Get specialized doctor data from server",data);;
      //push doctors as per the specialization into the array
      var arraylength = data.docs.length;
      console.log("arraylength",arraylength);

      for(var i=0;i<arraylength;i++)
      {
        this.orthodoctors[i] = data.docs[i].doctorname;
        console.log(this.orthodoctors[i]);
      }
      console.log("Error",this.orthodoctors);

      this.employeddoctors.push(data.docs);
      console.log("List of specialization doctors",this.employeddoctors)
 })
    }
}
