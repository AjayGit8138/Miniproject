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
  bookingForm:FormGroup;
  dbdoctorid:any;
  patientRequest = [];
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
  constructor(private serveapi:ApiserviceService,private modalService: NgbModal,private bookForm:FormBuilder,private route:Router,private toastr:ToastrService) {
    this.bookingForm = this.bookForm.group({
      requestId:['',Validators.required],
      patientName:['',Validators.required],
      treatmentCategory:['',Validators.required],
      appointStatus:['',Validators.required],
      assignDoctor:['',Validators.required],
      dateofAppointment:['',Validators.required],
      timingforAppointment:['',Validators.required],
      tokenName:['',Validators.required],
      dbdoctorReference:['']
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
     
        if(data.status == 404)
        {
          this.tablestatus = true;
          this.showerror("Patient Request is Currently Not available");
        }
        else
        {
              const availength = data.data.docs.length;
             
              this.patientRequest = [];
        
              for(let i=0;i<availength;i++)
              {
                this.patientRequest.push(data.data.docs[i]);
              }
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
   
    const getDoctorname = e.target.value;
    this.serveapi.getDoctorslist(this.doctors).subscribe((data)=>{
    
      //push doctors as per the specialization into the array
      const arrayLength = data.data.docs.length;
      
      this.orthodoctors = [];
      this.doctorsid = [];
      for(let i=0;i<arrayLength;i++)
      {
        if(getDoctorname == data.data.docs[i].doctorname)
        {
        this.orthodoctors[i] = data.data.docs[i].doctorname;
      
        this.doctorsid[i] = data.data.docs[i]._id;
        this.dbdoctorid = data.data.docs[i]._id;
      }
      
    }

    let timeslot = {
      doctorname:getDoctorname,
      docid:this.dbdoctorid
    }
    this.serveapi.gettimeslot(timeslot).subscribe((res)=>{
      for(let x of res.data.docs)
      {
      
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
  this.bookingForm.controls['Tokenname'].setValue(this.tokename);
 
  this.serveapi.getDoctorslist(this.doctors).subscribe((data)=>{
 
    //push doctors as per the specialization into the array
    const arraylength = data.data.docs.length;
   
    this.orthodoctors = [];
    this.doctorsid = [];
    for(let i=0;i<arraylength;i++)
    {
      this.orthodoctors[i] = data.data.docs[i].doctorname;
    
      this.doctorsid[i] = data.data.docs[i]._id;
      
    }
  

    this.employeddoctors.push(data.docs);
  
})

  
}
//
  saveBookingStatus(bookinformation:any){
 
    bookinformation.docId = this.dbdoctorid;
   
    bookinformation.timingforAppointment = this.timeclock;
    this.serveapi.bookAppointment(bookinformation,this.patientid).subscribe((data)=>{
      if(data)
      {
      this.showsuccess("Patient Request is Booked Successfully");
      }
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

    this.patientid = row._id;
    this.patientrefid = row._rev;


    this.bookingForm.controls['requestId'].setValue(row.patientid);
    this.tokename = row.patientid;
    this.bookingForm.controls['patientname'].setValue(row.patientname);
    this.bookingForm.controls['Treatmentcategory'].setValue(row.Treatmentcategory);
    this.bookingForm.controls['appointstatus'].setValue(this.status);
    }
    //toastr service
    showerror(message)
    {
      this.toastr.error(message);
    }
    showsuccess(message)
    {
      this.toastr.success(message);
    }
}
