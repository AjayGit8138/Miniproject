import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-mypatient',
  templateUrl: './mypatient.component.html',
  styleUrls: ['./mypatient.component.css']
})
export class MypatientComponent implements OnInit {
//testanalyze
testform:FormGroup;
errorMessage:any;
numbercount:number = 1;
tablets:any = [];
testgenerated:any;
medical=['orthotablet','skinmedicine','hearttablet','nervestablet','eyemedicine','generalmedicine'];
nofreport:any;
increamentcount:number;
patineid:any;
closeResult = '';
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
  constructor(private reportform:FormBuilder,private activeparams:ActivatedRoute,private serveapi:ApiserviceService,private router:Router) {
    // this.nofreport = this.currentpage.id + '-' + 'Testreport' + '-' + this.numbercount;
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
      medicinethree:['',Validators.required]

  });



   }

  ngOnInit(): void {
    this.serveapi.checkdoctorlogin(this.currentpage.id).subscribe((data)=>{
      console.log("Logged doctor details",data);
      console.log("Doctor-Name",data.doctorname);
      console.log("category",data.specialist);
      this.undertreatment.doctor = data.doctorname;
      this.undertreatment.Treatmentcategory = data.specialist;
      this.testgenerated = this.currentpage.id + '-' + this.undertreatment.doctor;
    })
    
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

  display(setdisplay:any)
  {
    this.divboolean = setdisplay;
  }
  backtohome(){
    this.router.navigate(['..']);
    
  }

  //analyze test report

  testformdisplay(list:any,display:any)
  {
    
    this.divboolean = display;
    this.testform.controls['patientId'].setValue(list.requestId);
    this.testform.controls['patientname'].setValue(list.patientname);
    this.testform.controls['reportby'].setValue(this.testgenerated);
    this.patineid = list.requestId;
    this.nofreport = list.requestId + '-' + 'Testreport' + '-' + this.numbercount;
    this.autocode(this.nofreport);
    this.testform.controls['totalreport'].setValue(this.nofreport);
  }
  generatereport(formobject:NgForm)
  {
    console.log("Report Generation",formobject);
    this.serveapi.generatetestreport(formobject).subscribe((response)=>{
      if(response)
        console.log("test report successfully generated into the database",response);
        alert(response.message);
        this.testform.reset()
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
      if(params == response.docs[0].totalreport)
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
  }

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
          console.log(response.docs[0][`${this.tabletlist.tabletname}`]);
          this.tablets.push(response.docs[0][`${this.tabletlist.tabletname}`]);
        },
        (error) => {                              
          console.error('error caught in component')
          this.errorMessage = error;
          console.log("Errot",this.errorMessage.error);
          alert("oops!server Down can't take a details from Database" + this.errorMessage.error);
        }
      )
  }

  
}
