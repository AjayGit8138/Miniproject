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

uploadedFiles: Array < File > ;
testForm:FormGroup;
errorMessage:any;
numberCount:number = 1;
tablets:any = [];
fileName:any;
testGenerated:any;
medical=['orthotablet','skinmedicine','heartmedicine','nervesmedicine','eyemedicine','generalmedicine'];
nofreport:any;
increamentCount:number;
patineId:any;
closeResult = '';
refStorage = [];
object = {
  id:'',
  name:'',
  generatedby:'',
};
//


  currentPage= {id:'number'};
  tabChange:any;
  divBoolean:number = 1;
  setDivision:number = 1;

  underTreatment = {
    doctor:'',
    treatmentCategory:''
  };

  mypatients = [];
  constructor(private reportForm:FormBuilder,private activeParams:ActivatedRoute,private serveApi:ApiserviceService,private routerService:Router,private toastrService:ToastrService) {
    
    this.activeParams.params.subscribe((data:Params)=>{
      this.currentPage = {
        id:data['id'],
      }
    })
    this.divBoolean = 1;

    this.testForm = this.reportForm.group({
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
      medicineone:['',Validators.required],
      medicinetwo:['',Validators.required],
      medicinethree:['',Validators.required],
      docid:['',Validators.required],
      filename:['',Validators.required]

  });



   }

  ngOnInit(): void {
   
    this.serveApi.checkDoctorLogin(this.currentPage.id).subscribe((data)=>{
     
      localStorage.setItem('doctorid',data.data.docs[0]._id);
     
      this.underTreatment.doctor = data.data.docs[0].doctorname;
      this.underTreatment.treatmentCategory = data.data.docs[0].specialist;
      this.testGenerated = this.currentPage.id + '-' + this.underTreatment.doctor;

      this.getDetail();
    })
    
    
  }
  getDetail()
  {
  
    this.serveApi.getTotalPatients(this.underTreatment.doctor,this.underTreatment.treatmentCategory).subscribe((data)=>{
  
      this.showSuccess(data.success);
      //get patients details working under doctor
      for(const element of data.data.docs)
      {
        this.mypatients.push(element);
      }
    
    
    })

  }

  submitBooldSample(formvalue:NgForm,_list:any)
  {
    console.log("Bloodsample",formvalue);
    
  }
  display(setdisplay:any)
  {
    this.divBoolean = setdisplay;
  }
  backtohome(){
    this.routerService.navigate(['..']);
    
  }
  //checkfilename
  checkFile(event:any)
  {
    let fullPath = event.target.value;
    this.fileName = `/src/images/`+ fullPath.replace(/^.*[\\\/]/, '');
   
  }


  //filechange
  fileChange(element) {
    const file = element.target.files[0];


    const formdata = new FormData();
    formdata.append("file",file);
    this.serveApi.postData(formdata)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
}
  deletePatient(list:any)
  {
   
   
    this.serveApi.deletePatient(list).subscribe((response=>{
      if(response)
      {
      this.showSuccess("Pateint record is Deleted successfully");
      }
      window.location.reload();
    }),(err)=>{
      console.log("Patient record is not deleted",err);
    })


  }

  //analyze test report

  testformDisplay(list:any,display:any)
  {
    
    this.divBoolean = display;
    this.testForm.controls['patientId'].setValue(list.patientid);
    this.testForm.controls['patientname'].setValue(list.patientname);
    this.testForm.controls['reportby'].setValue(this.testGenerated);
    this.patineId = list.patientid;
    this.nofreport = list.patientid + '-' + 'Testreport' + '-' + this.numberCount;
    this.autoCode(this.nofreport);
    this.testForm.controls['totalreport'].setValue(this.nofreport);
  }
  generateReport(formobject:any)
  {
  
   formobject.filename = formobject.filename.replace(/^.*[\\\/]/, '');
    formobject.docid = localStorage.getItem('doctorid');
    console.log("formbobject",formobject);
    this.serveApi.generateTestReport(formobject).subscribe((response)=>{
      if(response)
      {

        this.showSuccess(response.success);
        this.testForm.reset()
      }
    },(error)=>{
      console.log("Test report not generated from the server",error);
    })
  }
  navigatetoBack(params:any){
    this.divBoolean = params;
   
  }

  tabletList = {
    "tabletname":"",
  }
  autoCode(params:any)
  {
    this.serveApi.getTestReport(this.nofreport).subscribe((response)=>{
  
      if(params == response.data.docs[0].totalreport)
      {
        this.numberCount += 1;
        this.nofreport = this.patineId + '-' + 'Testreport' + '-' + this.numberCount;
         this.testForm.controls['totalreport'].setValue(this.nofreport);

      }
      else{
        console.log("Not matched id",params);
      }
      this.autoCode(this.nofreport);
        
    })
  }
  addtestReport(list:any,showdiv:any)
  {
    this.divBoolean = showdiv;
    this.object.id = list.patientid;
    this.object.name = list.patientname;
    this.object.generatedby = this.testGenerated;
  }
 
  sendData(event:any)
  {
    this.divBoolean = event;
  }

  //automatic talets fill in dropdown list
  setMedicine(event:any): void
  {
    this.tabletList.tabletname = event.target.value;
    this.getMedical();
  }
  getMedical()
  {
    let reference = this.tabletList.tabletname;
      this.serveApi.getTablets(reference).subscribe(
        (response) => {                          
          this.tablets = [];
          this.tablets.push(response.data.docs[0][`${this.tabletList.tabletname}`]);
        },
        (error) => {                              
       
          this.errorMessage = error;
          
        
          this.showError(this.errorMessage.error);
        }
      )
  }


  showSuccess(message:any)
  {
    this.toastrService.success(message);
  }

  showError(message:any)
  {
    this.toastrService.error(message);
  }
}
