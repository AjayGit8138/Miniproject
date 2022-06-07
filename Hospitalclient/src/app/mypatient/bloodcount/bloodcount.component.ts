import { Component, OnInit,Input, Output,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiserviceService } from 'src/app/apiservice.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bloodcount',
  templateUrl: './bloodcount.component.html',
  styleUrls: ['./bloodcount.component.css']
})
export class BloodcountComponent implements OnInit {
  bloodCount:FormGroup;
  @Input () bloodtest:any; 
  @Input () reference:any;
  @Input () doctorid:any;
 
  uploadedFiles: Array < File > ;
  pdfName:any;
  numberCount:number = 1;
  divBoolean:any;
  bloodCountReport:any;
  currentDate:any;
  makePdf = [];
  arrayofKey = [];
  @Output() public sendData = new EventEmitter<number>();
  constructor(private router:Router,private bloodTestForm:FormBuilder,private serveapi:ApiserviceService,private toastr:ToastrService) {
    this.bloodCount = this.bloodTestForm.group({
      patientId:['',Validators.required],
      patientname:['',Validators.required],
      reportby:['',Validators.required],
      totalreport:['',Validators.required],
      Rbc:['',Validators.required],
      hemoglobin:['',Validators.required],
      hemocrit:['',Validators.required],
      mcv:['',Validators.required],
      mch:['',Validators.required],
      rdw:['',Validators.required],
      
    })
   }

  ngOnInit(): void {
   
    this.bloodCount.controls['patientId'].setValue(this.bloodtest.id);
    this.bloodCount.controls['patientname'].setValue(this.bloodtest.name);
    
    this.bloodCountReport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numberCount;
    this.autoCode(this.bloodCountReport);
  
    this.bloodCount.controls['reportby'].setValue(this.bloodtest.generatedby);
    this.bloodCount.controls['totalreport'].setValue(this.bloodCountReport);

    this.currentDate = new Date();
  }
  submitBloodSample(formvalue:any,_ref:any)
  {
   
    
      this.makePdf.push(formvalue);
      this.arrayofKey = Object.keys(this.makePdf[0]);
    
      formvalue.docid = localStorage.getItem('doctorid');
      this.serveapi.generateBloodCountReport(formvalue).subscribe((response)=>{
        
        if(response.status == 200)
        {
          this.showSuccess(response.success);
          this.bloodCount.reset()
        }
      
      },(error)=>{
        this.showError("can't generate report");
        console.log("Test report not generated from the server",error);
      })
  }

  //autogenerate test report based on Previous report
  autoCode(params:any)
  {
    this.serveapi.getTestReport(params).subscribe((response)=>{
     
      if(params == response.data.docs[0].totalreport)
      {
        this.numberCount += 1;
        this.bloodCountReport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numberCount;
        this.pdfName = this.bloodCountReport;
         this.bloodCount.controls['totalreport'].setValue(this.bloodCountReport);
      }
      else{
        console.log("Not matched id",params);
      }
      this.autoCode(this.bloodCountReport);
        
    })
  }

  exit()
  {
   this.sendData.emit(1);
  }
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


    showSuccess(message:any)
    {
      this.toastr.success(message);
    }
    showError(message:any)
    {
      this.toastr.error(message);
    }
    
    get patientId() {return this.bloodCount.get('patientId');}

    get patientname() {return this.bloodCount.get('patientname')}
    get reportby()  {return this.bloodCount.get('reportby')}
    get totalreport() {return this.bloodCount.get('totalreport')}
    get Rbc() {return this.bloodCount.get('Rbc')}
    get hemoglobin() {return this.bloodCount.get('hemoglobin')}
    get hemocrit() {return this.bloodCount.get('hemocrit')}
    get mcv() {return this.bloodCount.get('mcv')}

    get mch() {return this.bloodCount.get('mch')}

    get rdw() {return this.bloodCount.get('rdw')}



}
