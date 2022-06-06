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
  todaydate:any;
  month:any;
  year:any;
  tdate:any;
  direct:FormGroup;
  currentDate:any = new Date();
  doctorinformation = {
    dbid:'',
    doctorid:'',
    specialist:'',
    patientid:'',
    patientdbid:''

  }
  currentpage= {id:'number'};
  timeslot = ['8:00AM to 9:00AM','9:00AM to 10:00AM','10:00AM to 11:00AM','11:00AM to 12:00PM','12:00PM to 1:00PM','3:00PM to 4:00PM','4:00PM to 5:00PM','6:00PM to 7:00PM','7:00PM to 8:00PM']
  constructor(private consulting:FormBuilder,private activeparams:ActivatedRoute,private serveapi:ApiserviceService,private toastr:ToastrService) { 
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
      
      }
    
    })
    this.serveapi.getdoctor(this.currentpage.id).subscribe((data)=>{
      console.log("Response from a server",data);
      this.direct.controls['doctorname'].setValue(data.data.doctorname);
      this.direct.controls['specialist'].setValue(data.data.specialist);
      this.direct.controls['patientid'].setValue(this.currentpage.id);
      this.doctorinformation.dbid = data.data._id;
      this.doctorinformation.doctorid = data.data.certificateid;
      this.doctorinformation.specialist = data.data.specialist;
      this.doctorinformation.patientid = this.currentpage.id;

    })
    this.direct = this.consulting.group({
      patientid:['',Validators.required],
      doctorname:['',Validators.required],
      specialist:['',Validators.required],
      appointment:['',Validators.required],
      appointmenttime:['',Validators.required]

    })
  }
  directconsulting:FormGroup;
  ngOnInit(): void {
    console.log("constructor");
  
  }

    pastdate()
    {
      console.log("Hi*******");
      this.todaydate = new Date();
      this.month = this.todaydate.getMonth();
      this.year = this.todaydate.getUTCFullYear() - 0;
      this.tdate = this.todaydate.getDate();
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
    
    bookdirectappointment(formvalue:any)
    {
      formvalue.dbparentid = this.doctorinformation.dbid;
      formvalue.doctorid = this.doctorinformation.doctorid;
      const dbrefpatientid = localStorage.getItem('patientdbid');
      formvalue.dbrefpatientid = dbrefpatientid;
      this.serveapi.directbooking(formvalue).subscribe((response)=>{
        console.log("return response",response);
      })
      console.log("Bookdirect",formvalue);
      this.success("Your Appointment Booking is generated successfully" + formvalue.appointmenttime + "AM")

    }
    public success(message:any)
    {
      this.toastr.success(message);
    }
 
}
