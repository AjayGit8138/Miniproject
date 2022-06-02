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
    this.serveapi.getrequestedpatient().subscribe((data)=>{
      console.log("waiting for Doctor appointment",data.docs);
      this.requestedpatients = data.docs.length;
    })
    var referenceid = 'Doctor';
    this.serveapi.getdoctorslist(referenceid).subscribe((data)=>{
      console.log("Avalable Doctors in Hospital",data);
      this.avialabledoctors = data.docs.length;
    })
    this.serveapi.getadmittedpatients().subscribe((data)=>{
      console.log("Total admitted patients in our hospital",data.data.docs);
      this.admittedpatients = data.data.docs.length;
    }),((err)=>{
        console.log("Admitted Patients Details Not To fetch from a Server");
    })
  }

}
