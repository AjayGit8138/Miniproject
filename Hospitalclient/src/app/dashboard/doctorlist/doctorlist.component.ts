import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  doctorlist = [];
  constructor(private serveapi:ApiserviceService) { }

  ngOnInit(): void {
    var referenceid = 'Doctor';
    this.serveapi.getdoctorslist(referenceid).subscribe((data)=>{
      console.log("Avalable Doctors in Hospital",data);
      var availength = data.docs.length;
      this.doctorlist = [];
      for(var i=0;i<availength;i++)
      {
        this.doctorlist.push(data.docs[i]);
      }
      console.log("Availabily doctors in Hospital",this.doctorlist);
    })
  }
  selectdoctors(event:any)
  {
     console.log(event.target.value);
     var referenceid = event.target.value;
     this.serveapi.getdoctorslist(referenceid).subscribe((data)=>{
          console.log("Get specialized doctor data from server",data);
     })
  }
}
