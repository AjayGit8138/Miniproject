import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-yourdoctor',
  templateUrl: './yourdoctor.component.html',
  styleUrls: ['./yourdoctor.component.css']
})
export class YourdoctorComponent implements OnInit {
  todayDate:any;
  month:any;
  year:any;
  tdate:any;
  directConsulting:FormGroup;
  currentDate:any = new Date();
  doctorinformation = {
    dbId:'',
    doctorId:'',
    specialist:'',
    patientId:'',
    patientDbId:''

  }
  currentPage= {id:'number'};
  timeSlot = ['8:00AM to 9:00AM','9:00AM to 10:00AM','10:00AM to 11:00AM','11:00AM to 12:00PM','12:00PM to 1:00PM','3:00PM to 4:00PM','4:00PM to 5:00PM','6:00PM to 7:00PM','7:00PM to 8:00PM']
  constructor(private consultingForm:FormBuilder,private activeParams:ActivatedRoute,private serveApi:ApiserviceService,private toastrService:ToastrService) { 
    this.activeParams.params.subscribe((data:Params)=>{
      this.currentPage = {
        id:data['id'],
      
      }
    
    })
    this.serveApi.getDoctor(this.currentPage.id).subscribe((data)=>{
      
      this.directConsulting.controls['doctorname'].setValue(data.data.doctorname);
      this.directConsulting.controls['specialist'].setValue(data.data.specialist);
      this.directConsulting.controls['patientid'].setValue(this.currentPage.id);
      this.doctorinformation.dbId = data.data._id;
      this.doctorinformation.doctorId = data.data.certificateid;
      this.doctorinformation.specialist = data.data.specialist;
      this.doctorinformation.patientId = this.currentPage.id;

    })
    this.directConsulting = this.consultingForm.group({
      patientid:['',Validators.required],
      doctorname:['',Validators.required],
      specialist:['',Validators.required],
      appointmentdata:['',Validators.required],
      appointmenttime:['',Validators.required],
    

    })
  }
  directconsulting:FormGroup;
  ngOnInit(): void {
    console.log("constructor");
  
  }

    pastDate()
    {
  
      this.todayDate = new Date();
      this.month = this.todayDate.getMonth();
      this.year = this.todayDate.getUTCFullYear() - 0;
      this.tdate = this.todayDate.getDate();
      if(this.month < 10)
      {
        this.month = "0" + this.month;
      }
      if(this.tdate < 10){
        this.tdate = "0" + this.tdate;
      }
      const maxdate = this.year + "-" + this.month + "-" +this.tdate;
      document.getElementById('time').setAttribute("min",maxdate);
      const setdate = document.getElementById('time') as HTMLDataElement;
      setdate.setAttribute("min",maxdate);

    }
    
    bookDirectAppointment(formvalue:any)
    {
      formvalue.dbparentid = this.doctorinformation.dbId;
      formvalue.doctorid = this.doctorinformation.doctorId;
      const dbrefpatientid = localStorage.getItem('patientdbid');
      formvalue.dbrefpatientid = dbrefpatientid;
    
      this.serveApi.directBooking(formvalue).subscribe((response)=>{
       
        if(response.status == 201)
        {
          this.showSuccess("Your Appointment Booking is generated successfully");
          window.location.reload();
         
        }
      
      })
     
    }
    public showSuccess(message:any)
    {
      this.toastrService.success(message);
    }
 
}
