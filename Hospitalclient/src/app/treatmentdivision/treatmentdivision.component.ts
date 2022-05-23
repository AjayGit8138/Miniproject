import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-treatmentdivision',
  templateUrl: './treatmentdivision.component.html',
  styleUrls: ['./treatmentdivision.component.css']
})
export class TreatmentdivisionComponent implements OnInit {
  currentpage= {id:'number'};
  logindocid:any;
  tabchange:any;
  setdivision:number = 1;
  undertreatment = {
    doctor:'',
    Treatmentcategory:''

  };
  mypatients = [];
  constructor(private activeparams:ActivatedRoute,private serveapi:ApiserviceService,private router:Router) {
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
       
      }
      console.log("currentpate treat",this.currentpage);
     
    })
          
   }
  ngOnInit(): void {
    this.serveapi.checkdoctorlogin(this.currentpage.id).subscribe((data)=>{
      console.log("Logged doctor details",data);
      console.log("Doctor-Name",data.doctorname);
      console.log("category",data.specialist);
      this.undertreatment.doctor = data.doctorname;
      this.undertreatment.Treatmentcategory = data.specialist;
    })
    this.tabchange = 1;
    this.logindocid = this.currentpage.id;
  }

  tabselect(params:any)
  {
    this.tabchange = params;
    this.getdetail();
  }

 
  
  gettreatmentlist(){
    
    // this.serveapi.checkdoctorlogin(this.currentpage.id).subscribe((data)=>{
    //   console.log("Logged doctor details",data);
    //   console.log("Doctor-Name",data.doctorname);
    //   console.log("category",data.specialist);
    //   this.undertreatment.doctor = data.doctorname;
    //   this.undertreatment.Treatmentcategory = data.specialist;
    // })
    this.getdetail();
    
  }
  getdetail()
  {
    this.serveapi.gettotalpatients(this.undertreatment.doctor,this.undertreatment.Treatmentcategory).subscribe((data)=>{
      console.log("Undertreatment category is received successfully",data);

      //get patients details working under doctor
      for(var i=0;i<data.docs.length;i++)
      {
        this.mypatients.push(data.docs[i]);
      }
    
      console.log("Patients under working",this.mypatients);
    })

  }
  backtohome(){
    this.router.navigate(['..']);
    
  }
}
