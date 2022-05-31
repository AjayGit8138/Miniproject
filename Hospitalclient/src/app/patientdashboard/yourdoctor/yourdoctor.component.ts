import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery'
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
  
  currentpage= {id:'number'};
  constructor(private consulting:FormBuilder,private activeparams:ActivatedRoute,private serveapi:ApiserviceService,private toastr:ToastrService) { 
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
      
      }
    
    })
    this.serveapi.getdoctor(this.currentpage.id).subscribe((data)=>{
      console.log("Response from a server",data);
      this.direct.controls['doctorname'].setValue(data.doctorname);
      this.direct.controls['specialist'].setValue(data.specialist);
      this.direct.controls['patientid'].setValue(this.currentpage.id);
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
      var maxdate = this.year + "-" + this.month + "-" +this.tdate;
      document.getElementById('time').setAttribute("min",maxdate);
      var setdate = document.getElementById('time') as HTMLDataElement;
      setdate.setAttribute("min",maxdate);

    }
    
    bookdirectappointment(formvalue:any)
    {
      console.log("Bookdirect",formvalue);
      this.success("Your Appointment Booking is generated successfully" + formvalue.appointmenttime + "AM")

    }
    public success(message:any)
    {
      this.toastr.success(message);
    }
 
}
