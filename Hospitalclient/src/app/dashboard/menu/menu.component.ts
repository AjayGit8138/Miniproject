import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  requestedpatients:any;
  avialabledoctors:any;
  admittedpatients:any;
  constructor(private serveapi:ApiserviceService) { }

  ngOnInit(): void {
    this.getdetails();
  }

  getdetails()
  {
    this.serveapi.getrequestedpatient().subscribe((data)=>{
     
      this.requestedpatients = data.data.docs.length;
    })
    const referenceid = 'Doctor';
    this.serveapi.getdoctorslist(referenceid).subscribe((data)=>{
     
      this.avialabledoctors = data.data.docs.length;
    })
    this.serveapi.getadmittedpatients().subscribe((data)=>{
     
      this.admittedpatients = data.data.docs.length;
    })
  }

}

 