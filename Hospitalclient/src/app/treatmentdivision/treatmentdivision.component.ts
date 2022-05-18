import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-treatmentdivision',
  templateUrl: './treatmentdivision.component.html',
  styleUrls: ['./treatmentdivision.component.css']
})
export class TreatmentdivisionComponent implements OnInit {
  currentpage= {id:'number'};
  tabchange:any;
  undertreatment = {
    doctor:'',
    Treatmentcategory:''

  };
  constructor(private activeparams:ActivatedRoute,private serveapi:ApiserviceService) {
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
       
      }
      console.log(this.currentpage);
    })
          
   }
  ngOnInit(): void {
   
  }

  tabselect(params:any)
  {
    this.tabchange = params;
  }
  gettreatmentlist(){
    
    this.serveapi.checkdoctorlogin(this.currentpage.id).subscribe((data)=>{
      console.log("Logged doctor details",data);
      console.log("Doctor-Name",data.doctorname);
      console.log("category",data.specialist);
      this.undertreatment.doctor = data.doctorname;
      this.undertreatment.Treatmentcategory = data.specialist;
    })
    
  }
  getdetail()
  {
    this.serveapi.gettotalpatients(this.undertreatment.doctor,this.undertreatment.Treatmentcategory).subscribe((data)=>{
      console.log("Undertreatment category is received successfully",data);
    })

  }
}
