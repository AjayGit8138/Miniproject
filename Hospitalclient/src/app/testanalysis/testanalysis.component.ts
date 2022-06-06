import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-testanalysis',
  templateUrl: './testanalysis.component.html',
  styleUrls: ['./testanalysis.component.css']
})
export class TestanalysisComponent implements OnInit {
  testform:FormGroup;
  errorMessage:any;
  numbercount:number = 1;
  tablets:any = [];
  testgenerated:any;
  medical=['orthotablet','skinmedicine','hearttablet','nervestablet','eyemedicine','generalmedicine'];
  nofreport:any;
  increamentcount:number;
  currentpage= {id:'number',name:'string',title:'string',docname:'string',docid:'string'};
  closeResult = '';
  constructor(private reportform:FormBuilder,private modalService: NgbModal,private activeparams:ActivatedRoute,private serveapi:ApiserviceService,private router:Router) {
   
    this.activeparams.params.subscribe((data:Params)=>{
      this.currentpage = {
        id:data['id'],
        name:data['name'],
        title:data['title'],
        docname:data['docname'],
        docid:data['docid']
      }
      console.log(this.currentpage);
      this.testgenerated = this.currentpage.docid + '-' + this.currentpage.docname;
      console.log("Testreport Generatedby",this.testgenerated);

      //report count
      this.nofreport = this.currentpage.id + '-' + 'Testreport' + '-' + this.numbercount;
      this.autocode(this.nofreport);
    // report count ends

    //Auto generation code for testing report for patient
    })


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
        medicineone:['',Validators.required],
        medicinetwo:['',Validators.required],
        medicinethree:['',Validators.required]

    });
    

  this.testform.controls['patientId'].setValue(this.currentpage.id);
  this.testform.controls['patientname'].setValue(this.currentpage.name);
  this.testform.controls['reportby'].setValue(this.testgenerated);
  this.testform.controls['totalreport'].setValue(this.nofreport);
   }
  ngOnInit(): void {
  
    console.log("Constructor")
  }
  tabletlist = {
    "tabletname":"",
  }
  autocode(params:any)
  {
    this.serveapi.getTestReport(this.nofreport).subscribe((response)=>{
      console.log("autogenerate reports",response);
      if(params == response.docs[0].totalreport)
      {
        console.log('matched');
        this.numbercount += 1;
        console.log("counts",this.numbercount);
        this.nofreport = this.currentpage.id + '-' + 'Testreport' + '-' + this.numbercount;
         this.testform.controls['totalreport'].setValue(this.nofreport);

      }
      else{
        console.log("Not matched id",params);
      }
      this.autocode(this.nofreport);
        
    })
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
      this.serveapi.getTablets(reference).subscribe(
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

  //testreport generation
  generatereport(formobject:NgForm)
  {
    console.log("Report Generation",formobject);
    this.serveapi.generateTestReport(formobject).subscribe((response)=>{
      if(response)
      {
        console.log("test report successfully generated into the database",response);
        alert(response.message);
        this.testform.reset()
      }
    },(error)=>{
      console.log("Test report not generated from the server",error);
    })
  }
  navigatetoback(){
    this.router.navigate(['treat/mypatient',this.currentpage.docid]);
   
  }
  
}
