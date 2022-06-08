import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,Params } from '@angular/router';

import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bookingform:FormGroup;
  id:any;
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
  tabchange:any;
  currentpage = {id:"number"}
  constructor(private activeparams:ActivatedRoute, private toastrSevice:ToastrService,private serveapi:ApiserviceService,private modalService: NgbModal,private bookform:FormBuilder,private route:Router,private authserve:AuthService) { 
    this.bookingform = this.bookform.group({
        requestId:['',Validators.required],
        patientname:['',Validators.required],
        Treatmentcategory:['',Validators.required],
        appointstatus:['',Validators.required],
        assigndoctor:['',Validators.required],
        dateofappointment:['',Validators.required],
        timingforappointment:['',Validators.required]
    })

    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
      }
    })
  }
  number:any;

  orthodoctors = [];
  sicks= ["General","skin","Heart","Dental","Eye","Nerves","Orthology","MentalHealth"];
  skindoctors = ["karthick","Ramamoorthy","ramachandran","geetha","srinivasan"];
  ngOnInit(): void {
    this.number = 1;

    this.serveapi.getRequestedPatient().subscribe((data)=>{
      const availength = data.docs.length;
      this.patientrequest = [];
      for(let i=0;i<availength;i++)
      {
        this.patientrequest.push(data.docs[i]);
      }
    })
    this.id = localStorage.getItem('token');
  }
  linkchange(params:any)
  {
    this.tabchange = params;
  }

  //Form for Booking ng-modal open
  open(content:any,row:any) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })
   
    this.patientid = row._id;
    this.patientrefid = row._rev;
  

    this.bookingform.controls['requestId'].setValue(row.requestId);
    this.bookingform.controls['patientname'].setValue(row.patientname);
    this.bookingform.controls['Treatmentcategory'].setValue(row.Treatmentcategory);
    this.bookingform.controls['appointstatus'].setValue(this.status);
    this.doctors = row.Treatmentcategory;

    this.serveapi.getDoctorslist(this.doctors).subscribe((data)=>{
      //push doctors as per the specialization into the array
      const arraylength = data.docs.length;
      for(let i=0;i<arraylength;i++)
      {
        this.orthodoctors[i] = data.docs[i].doctorname;
      }
      this.employeddoctors.push(data.docs);
     })
}

    savebookingstatus(bookinformation:any){
     
        bookinformation.timingforappointment = this.timeclock;
        this.serveapi.bookAppointment(bookinformation,this.patientid).subscribe((data)=>{
         
          this.showSuccess(data.message)
          window.location.reload();
        })
    }

    redirectlink(){
      this.route.navigate(['adminauth']);
    }

    //getter and setter for form validation
    get requestId() {return this.bookingform.get('requestId');}
    get dateofappointment() {return this.bookingform.get('dateofappointment');}
    get Treatmentcategory() {return this.bookingform.get('Treatmentcategory');}
    get appointstatus() {return this.bookingform.get('appointstatus');}
    get assigndoctor() {return this.bookingform.get('assigndoctor');}
    get timingforappointment() {return this.bookingform.get('timingforappointment');}
    //getter and setter form validation ends

    //session Logout
  logout() {  
   
    this.authserve.logout();  
    this.route.navigate(['adminauth']);  
  } 

  //navbar Mobileview
  mobileview()
  {
      let menu = document.querySelector('#menu-btn');
      let navbar = document.querySelector('.navbar');

      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
  }

  //totastr notifications
  public showSuccess(meassage:any)
  {
    this.toastrSevice.success(meassage);
  }
}



