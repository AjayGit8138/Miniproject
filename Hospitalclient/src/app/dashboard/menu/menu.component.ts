import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  requestedPatients:any;
  avialableDoctors:any;
  admittedPatients:any;
  constructor(private serveApi:ApiserviceService) { }

  ngOnInit(): void {
    this.getdetails();
  }

  getdetails()
  {
    this.serveApi.getrequestedpatient().subscribe((data)=>{
     
      this.requestedPatients = data.data.docs.length;
    })
    const referenceid = 'Doctor';
    this.serveApi.getDoctorslist(referenceid).subscribe((data)=>{
     
      this.avialableDoctors = data.data.docs.length;
    })
    this.serveApi.getadmittedpatients().subscribe((data)=>{
     
      this.admittedPatients = data.data.docs.length;
    })
  }

}

 