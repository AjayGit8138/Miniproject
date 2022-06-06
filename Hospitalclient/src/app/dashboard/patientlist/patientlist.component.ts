import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  bookingform:FormGroup;
  dbdoctorid:any;
  patientrequest = [];
  doctorlist = [];
  employeddoctors = [];
  doctorsid = [];
  closeResult = '';
  doctorsobject = {};
  goodresponse = [];
  status:any = "YES";
  tokename:any;
  timeclock:any;
  doctors:any;
  content = '';
  checkdate:any;
  tablestatus:boolean = false;
  //for update new method
  patientid:any;
  patientrefid:any;
  currentDate:any = new Date();
  constructor(private serveapi:ApiserviceService,private modalService: NgbModal,private bookform:FormBuilder,private route:Router,private toastr:ToastrService) {
    this.bookingform = this.bookform.group({
      requestId:['',Validators.required],
      patientname:['',Validators.required],
      Treatmentcategory:['',Validators.required],
      appointstatus:['',Validators.required],
      assigndoctor:['',Validators.required],
      dateofappointment:['',Validators.required],
      timingforappointment:['',Validators.required],
      Tokenname:['',Validators.required],
      dbdoctorreference:['']
  })
   }
   number:any;
   num = 1;
   orthodoctors = [];
   sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology"];
  
  timeslotbook = ['8:00AM to 9:00AM','9:00AM to 10:00AM','10:00AM to 11:00AM','11:00AM to 12:00PM','12:00PM to 1:00PM','3:00PM to 4:00PM','4:00PM to 5:00PM','6:00PM to 7:00PM','7:00PM to 8:00PM']

  ngOnInit(): void {

    this.number = 1;
    this.orthodoctors = [];
    this.getrequestpatients();
  
  }

    getrequestpatients()
    {
      this.serveapi.getrequestedpatient().subscribe((data)=>{
        console.log("waiting for Doctor appointment",data);
        if(data.status == 404)
        {
          this.tablestatus = true;
          this.showerror("Patient Request is Currently Not available");
        }
        else
        {
              const availength = data.data.docs.length;
              console.log("returned Length",availength);
              this.patientrequest = [];
        
              for(let i=0;i<availength;i++)
              {
                this.patientrequest.push(data.data.docs[i]);
              }
       
            console.log("patient request",this.patientrequest);
      }
      })

    }

  //

  //check appointment date with doctor booked date
  checkappointmentdate(event:any)
  {
    this.checkdate = event.target.value;
  }
  selectindex(e:any)
  {
    console.log("Onchange get indexval",e.target.value);
    const getDoctorname = e.target.value;
    this.serveapi.getdoctorslist(this.doctors).subscribe((data)=>{
      console.log("Get specialized doctor data from server",data);
      //push doctors as per the specialization into the array
      const arraylength = data.data.docs.length;
      console.log("arraylength",arraylength);
      this.orthodoctors = [];
      this.doctorsid = [];
      for(let i=0;i<arraylength;i++)
      {
        if(getDoctorname == data.data.docs[i].doctorname)
        {
        this.orthodoctors[i] = data.data.docs[i].doctorname;
      
        this.doctorsid[i] = data.data.docs[i]._id;
   
        console.log("doctors id from selectindex",this.doctorsid[i]);
        this.dbdoctorid = data.data.docs[i]._id;
      }
      console.log("Error",this.orthodoctors);
      console.log("Totalid's length",this.doctorsid);
      

      
    }

    let timeslot = {
      doctorname:getDoctorname,
      docid:this.dbdoctorid
    }
    this.serveapi.gettimeslot(timeslot).subscribe((res)=>{
      console.log("Available Time slot from doctor",res.data);
 
      
      for(let x of res.data.docs)
      {
        console.log("Timeslot",x.appointmenttime);
        if(this.checkdate == x.appointmentdata)
        {
          let filtervalue = x.appointmenttime;
          this.timeslotbook = this.timeslotbook.filter(function(item){
            return item!== filtervalue
          })
        }
       
      }
    })
  })
  }

  public updatetreatment(e:any)
{
  
  this.doctors = e.target.value;
 this.tokename = this.tokename + '-T' + this.doctors
  this.bookingform.controls['Tokenname'].setValue(this.tokename);
  console.log("doctors",this.doctors);
  this.serveapi.getdoctorslist(this.doctors).subscribe((data)=>{
    console.log("Get specialized doctor data from server",data);
    //push doctors as per the specialization into the array
    const arraylength = data.data.docs.length;
    console.log("arraylength",arraylength);
    this.orthodoctors = [];
    this.doctorsid = [];
    for(let i=0;i<arraylength;i++)
    {
      this.orthodoctors[i] = data.data.docs[i].doctorname;
    
      this.doctorsid[i] = data.data.docs[i]._id;
      console.log(this.orthodoctors[i]);
      console.log("doctors id",this.doctorsid[i]);
    }
    console.log("Error",this.orthodoctors);
    console.log("Totalid's length",this.doctorsid);

    this.employeddoctors.push(data.docs);
    console.log("List of specialization doctors",this.employeddoctors)
})

  
}
//
  savebookingstatus(bookinformation:any){
    console.log(bookinformation);
    bookinformation.docid = this.dbdoctorid;
    console.log("new updated booking",bookinformation);
    console.log("Emptylist",this.orthodoctors);
    bookinformation.timingforappointment = this.timeclock;
    this.serveapi.bookappointment(bookinformation,this.patientid).subscribe((data)=>{
      console.log("Updated patient data is successfully loaded:",data);
      alert(data.message);
      window.location.reload();
    })
}

//set am pm for doctor schedule
timeformat()
{
  let timeinput = document.getElementById('timeinput') as HTMLInputElement;
  let timeSplit = timeinput.value.split(':'),
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

  //model pop up for booking form
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

    this.bookingform.controls['requestId'].setValue(row.patientid);
    this.tokename = row.patientid;
    this.bookingform.controls['patientname'].setValue(row.patientname);
    this.bookingform.controls['Treatmentcategory'].setValue(row.Treatmentcategory);
    this.bookingform.controls['appointstatus'].setValue(this.status);
    
    
    console.log("specialist",this.doctors);
 
    }
    //toastr service
    showerror(message)
    {
      this.toastr.error(message);
    }
}
