import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mypatient',
  templateUrl: './mypatient.component.html',
  styleUrls: ['./mypatient.component.css']
})
export class MypatientComponent implements OnInit {
//testanalyze
bloodreport:FormGroup;
testform:FormGroup;
errorMessage:any;
numbercount:number = 1;
tablets:any = [];
testgenerated:any;
medical=['orthotablet','skinmedicine','heartmedicine','nervesmedicine','eyemedicine','generalmedicine'];
nofreport:any;
increamentcount:number;
patineid:any;
closeResult = '';
refstorage = [];
object = {
  id:'',
  name:'',
  generatedby:'',
};
//


  currentpage= {id:'number'};
  tabchange:any;
  divboolean:number = 1;
  setdivision:number = 1;

  undertreatment = {
    doctor:'',
    Treatmentcategory:''
  };

  mypatients = [];
  constructor(private reportform:FormBuilder,private activeparams:ActivatedRoute,private serveapi:ApiserviceService,private router:Router,private toastr:ToastrService) {
    
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
      }
      console.log(this.currentpage);
    })
    this.divboolean = 1;

    this.testform = this.reportform.group({
      patientId:['',Validators.required],
      patientname:['',Validators.required],
      reportby:['',Validators.required],
      totalreport:['',Validators.required],
      diseases:['',Validators.required],
      remedies:['',Validators.required],
      precuations:['',Validators.required],
      dietplan:['',Validators.required],
      dosage:['',Validators.required],
      tabletscategory:['',Validators.required],
      // tablets:['',Validators.required],
      medicineone:['',Validators.required],
      medicinetwo:['',Validators.required],
      medicinethree:['',Validators.required],
      docid:['',Validators.required]

  });



   }

  ngOnInit(): void {
    console.log("doctor id",this.currentpage.id);
    this.serveapi.checkdoctorlogin(this.currentpage.id).subscribe((data)=>{
      console.log("Logged doctor details",data);
      localStorage.setItem('doctorid',data.data.docs[0]._id);
      console.log("Doctor-Name",data.data.docs[0].doctorname);
      console.log("category",data.data.docs[0].specialist);
      this.undertreatment.doctor = data.data.docs[0].doctorname;
      this.undertreatment.Treatmentcategory = data.data.docs[0].specialist;
      this.testgenerated = this.currentpage.id + '-' + this.undertreatment.doctor;

      this.getdetail();
    })
    
    
  }
  getdetail()
  {
    console.log(this.undertreatment);
    this.serveapi.gettotalpatients(this.undertreatment.doctor,this.undertreatment.Treatmentcategory).subscribe((data)=>{
      console.log("Undertreatment category is received successfully",data);
      this.showsuccess(data.success);
      //get patients details working under doctor
      for(const element of data.data.docs)
      {
        this.mypatients.push(element);
      }
    
      console.log("Patients under working",this.mypatients);
    })

  }

  submitbooldsample(formvalue:NgForm,_list:any)
  {
    console.log("Bloodsample",formvalue);
    
  }
  display(setdisplay:any)
  {
    this.divboolean = setdisplay;
  }
  backtohome(){
    this.router.navigate(['..']);
    
  }
  deletepatient(list:any)
  {
    console.log("Delete patient",list);
   
    this.serveapi.deletepatient(list).subscribe((response=>{
      console.log("Deleted patient record",response);
      window.location.reload();
    }),(err)=>{
      console.log("Patient record is not deleted",err);
    })


  }

  //analyze test report

  testformdisplay(list:any,display:any)
  {
    
    this.divboolean = display;
    this.testform.controls['patientId'].setValue(list.patientid);
    this.testform.controls['patientname'].setValue(list.patientname);
    this.testform.controls['reportby'].setValue(this.testgenerated);
    this.patineid = list.patientid;
    this.nofreport = list.patientid + '-' + 'Testreport' + '-' + this.numbercount;
    this.autocode(this.nofreport);
    this.testform.controls['totalreport'].setValue(this.nofreport);
  }
  generatereport(formobject:any)
  {
    console.log("Report Generation",formobject);
    formobject.docid = localStorage.getItem('doctorid');
    this.serveapi.generatetestreport(formobject).subscribe((response)=>{
      if(response)
      {
        console.log("test report successfully generated into the database",response);
        this.showsuccess(response.success);
        this.testform.reset()
      }
    },(error)=>{
      console.log("Test report not generated from the server",error);
    })
  }
  navigatetoback(params:any){
    this.divboolean = params;
   
  }

  tabletlist = {
    "tabletname":"",
  }
  autocode(params:any)
  {
    this.serveapi.gettestreport(this.nofreport).subscribe((response)=>{
      console.log("autogenerate reports",response);
      if(params == response.data.docs[0].totalreport)
      {
        console.log('matched');
        this.numbercount += 1;
        console.log("counts",this.numbercount);
        this.nofreport = this.patineid + '-' + 'Testreport' + '-' + this.numbercount;
         this.testform.controls['totalreport'].setValue(this.nofreport);

      }
      else{
        console.log("Not matched id",params);
      }
      this.autocode(this.nofreport);
        
    })
  }
  addtestreport(list:any,showdiv:any)
  {
    this.divboolean = showdiv;
    
    this.object.id = list.patientid;
    this.object.name = list.patientname;
    this.object.generatedby = this.testgenerated;

    
  }
 
  sendData(event:any)
  {
    this.divboolean = event;
  }

  //automatic talets fill in dropdown list
  setmedicine(event:any): void
  {
    this.tabletlist.tabletname = event.target.value;
    console.log(this.tabletlist.tabletname);
    this.getmedical();
  }
  getmedical()
  {
    let reference = this.tabletlist.tabletname;
      this.serveapi.gettablets(reference).subscribe(
        (response) => {                          
          console.log('response received',response);
          console.log(response.data.docs[0][`${this.tabletlist.tabletname}`]);
          this.tablets = [];
          this.tablets.push(response.data.docs[0][`${this.tabletlist.tabletname}`]);
        },
        (error) => {                              
          console.error('error caught in component')
          this.errorMessage = error;
          console.log("Errot",this.errorMessage.error);
          alert("oops!server Down can't take a details from Database" + this.errorMessage.error);
        }
      )
  }


  showsuccess(message)
  {
    this.toastr.success(message);
  }
  
}
