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
  constructor(private activeparams:ActivatedRoute, private toastr:ToastrService,private serveapi:ApiserviceService,private modalService: NgbModal,private bookform:FormBuilder,private route:Router,private authserve:AuthService) { 
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
      console.log(this.currentpage);
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
      const availength = data.docs.length;
      console.log("returned Length",availength);
      this.patientrequest = [];
      for(let i=0;i<availength;i++)
      {
        this.patientrequest.push(data.docs[i]);
      }
     
      console.log("patient request",this.patientrequest);
    })

    this.id = localStorage.getItem('token');
  }
 
  linkchange(params:any)
  {
    this.tabchange = params;
  }
  selectdoctors(event:any)
  {
     console.log(event.target.value);
     const referenceid = event.target.value;
     this.serveapi.getdoctorslist(referenceid).subscribe((data)=>{
          console.log("Get specialized doctor data from server",data);
     })
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
      console.log("Get specialized doctor data from server",data);
      //push doctors as per the specialization into the array
      var arraylength = data.docs.length;
      console.log("arraylength",arraylength);

      for(let i=0;i<arraylength;i++)
      {
        this.orthodoctors[i] = data.docs[i].doctorname;
        console.log(this.orthodoctors[i]);
      }
      console.log("Error",this.orthodoctors);

      this.employeddoctors.push(data.docs);
      console.log("List of specialization doctors",this.employeddoctors)
 })
    }

    savebookingstatus(bookinformation:any){
     
        bookinformation.timingforappointment = this.timeclock;
        this.serveapi.bookappointment(bookinformation,this.patientid).subscribe((data)=>{
          console.log("Updated patient data is successfully loaded:",data);
          alert(data.message);
          window.location.reload();
        })
    }

    redirectlink(){
      this.route.navigate(['adminauth']);
    }
    get requestId() {return this.bookingform.get('requestId');}
    get dateofappointment() {return this.bookingform.get('dateofappointment');}
    get Treatmentcategory() {return this.bookingform.get('Treatmentcategory');}
    get appointstatus() {return this.bookingform.get('appointstatus');}
    get assigndoctor() {return this.bookingform.get('assigndoctor');}
    get timingforappointment() {return this.bookingform.get('timingforappointment');}


   
  
  logout() {  
    console.log('logout');  
    this.authserve.logout();  
    this.route.navigate(['adminauth']);  
  } 
    
  }



