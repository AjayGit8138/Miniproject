import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.css']
})
export class PatientdashboardComponent implements OnInit {
  currentpage= {id:'number'};
  appointstatus:any = [];
  divBoolean:any;

  
  constructor(private activeparams:ActivatedRoute,private serviceapi:ApiserviceService,private route:Router) { 
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
       
      }
      console.log(this.currentpage);
    })
    this.serviceapi.checkpatientlogin(this.currentpage.id).subscribe((data)=>{
        console.log("session login data for patient",data);
        this.appointstatus.push(data.doc);
        for(var i=0;i<this.appointstatus.length;i++)
        {
              console.log(this.appointstatus[i]);
        }
      
        
    })
   
  }

  redirectback()
  {
      this.route.navigate(['..']);
  }
  showdiv(currentdiv:any)
  {
    this.divBoolean = currentdiv;
  }
  ngOnInit(): void {
  }

}
