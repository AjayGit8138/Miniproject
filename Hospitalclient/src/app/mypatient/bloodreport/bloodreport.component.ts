import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-bloodreport',
  templateUrl: './bloodreport.component.html',
  styleUrls: ['./bloodreport.component.css']
})
export class BloodreportComponent implements OnInit {
  @Input () bloodtest:any; 
  @Input () reference:any;
  @Input () doctorid:any;
  @Output() public sendData = new EventEmitter<number>();
  bloodReport:FormGroup;
  uploadedFiles: Array < File > ;
  pdfName:any;
  numberCount:number = 1;
  divBoolean:any;
  bloodTestReport:any;
  currentDate:any;
arrayofKey = [];
  defaultOptions = {
    jsPDF: {
      unit: 'px',
      format: 'a4',
    },
    html2canvas: {
      imageTimeout: 15000,
      logging: true,
      useCORS: false,
    },
    imageType: 'image/jpeg',
    imageQuality: 1,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    output: 'jspdf-generate.pdf', 
    init: function() { console.log("pdf") },
    success: function(pdf) {
      pdf.save(this.output);
    }
  }
  makePdf = [];
  constructor(private router:Router,private bloodtestform:FormBuilder,private serveapi:ApiserviceService) { 
    this.bloodReport = this.bloodtestform.group({
      patientId:['',Validators.required],
      patientname:['',Validators.required],
      reportby:['',Validators.required],
      totalreport:['',Validators.required],
      urinsugar:['',Validators.required],
      acetone:['',Validators.required],
      bloodsugarlevels:['',Validators.required]
    })
  }

  
  ngOnInit(): void {
   
    this.bloodReport.controls['patientId'].setValue(this.bloodtest.id);
    this.bloodReport.controls['patientname'].setValue(this.bloodtest.name);
    this.bloodTestReport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numberCount;
    this.autoCode(this.bloodTestReport);
   
    this.bloodReport.controls['reportby'].setValue(this.bloodtest.generatedby);
    this.bloodReport.controls['totalreport'].setValue(this.bloodTestReport);
    this.currentDate = new Date();
  }

  submitBloodsample(formvalue:any,_ref:any)
  {
      
      this.makePdf.push(formvalue);
      this.arrayofKey = Object.keys(this.makePdf[0]);
     
      formvalue.docid = localStorage.getItem('doctorid');
      this.serveapi.generateBloodReport(formvalue).subscribe((response)=>{
        if(response)
        {
      

          this.bloodReport.reset()
        }
      },(error)=>{
        console.log("Test report not generated from the server",error);
      })
  }

  //autogenerate test report code based on previous report
  autoCode(params:any)
  {
   
    
    this.serveapi.getTestReport(params).subscribe((data)=>{
      if(params == data.data.docs[0].totalreport)
      {
       
        this.numberCount += 1;
      
        this.bloodTestReport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numberCount;
        this.pdfName = this.bloodTestReport;
         this.bloodReport.controls['totalreport'].setValue(this.bloodTestReport);

      }
      else{
        console.log("Not matched id",params);
      }
      this.autoCode(this.bloodTestReport);
        
    })
  }
  exit()
  {
   this.sendData.emit(1);
  }

  //Pdf Generation Implementation
  public openPDF(): void {
    let DATA: any = document.getElementById('print');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
     
    
      PDF.save( this.pdfName+'.pdf');
    });
  }

  fileChange(element:any) {
    const file = element.target.files[0];
    const formdata = new FormData();
    formdata.append("file",file);
    this.serveapi.postData(formdata)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
}




//get setters for form validation

get patientId() {return this.bloodReport.get('patientId');}

get patientname() {return this.bloodReport.get('patientname')}
get reportby()  {return this.bloodReport.get('reportby')}
get totalreport() {return this.bloodReport.get('totalreport')}
get urinsugar() {return this.bloodReport.get('urinsugar')}
get acetone() {return this.bloodReport.get('acetone')}
get bloodsugarlevels() {return this.bloodReport.get('bloodsugarlevels')}

}


