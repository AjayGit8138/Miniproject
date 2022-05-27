import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
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
  bloodreport:FormGroup;
  uploadedFiles: Array < File > ;
  pdfname:any;
  numbercount:number = 1;
  divboolean:any;
  bloodtestreport:any;
  currentdate:any;
arrayofkey = [];
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
    init: function() {},
    success: function(pdf) {
      pdf.save(this.output);
    }
  }
  makepdf = [];
  constructor(private router:Router,private bloodtestform:FormBuilder,private serveapi:ApiserviceService) { 
    this.bloodreport = this.bloodtestform.group({
      patientId:['',Validators.required],
      patientname:['',Validators.required],
      reportby:['',Validators.required],
      totalreport:['',Validators.required],
      urinsugar:['',Validators.required],
      acetone:['',Validators.required],
      bloodsugarlevels:['',Validators.required]
    })
  
      // this.bloodreport.controls['patientId'].setValue(this.bloodtest.id);
      // this.bloodreport.controls['patientname'].setValue(this.bloodtest.name);
      // this.bloodreport.controls['reportby'].setValue(this.bloodtest.generatedby);
  }

  
  ngOnInit(): void {
    console.log(this.bloodtest);
    console.log("doctorid",this.doctorid)
    this.bloodreport.controls['patientId'].setValue(this.bloodtest.id);
    this.bloodreport.controls['patientname'].setValue(this.bloodtest.name);
    
    this.bloodtestreport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numbercount;
    this.autocode(this.bloodtestreport);
    console.log("autogenerate blood",this.bloodtestreport);
    this.bloodreport.controls['reportby'].setValue(this.bloodtest.generatedby);
    this.bloodreport.controls['totalreport'].setValue(this.bloodtestreport);

    this.currentdate = new Date();
   
  }

  submitbooldsample(formvalue:NgForm,ref:any)
  {
    // this.autocode(this.bloodtestreport);
      console.log("Formvalues",formvalue);
      this.makepdf.push(formvalue);
      this.arrayofkey = Object.keys(this.makepdf[0]);
      console.log(this.makepdf);
      this.serveapi.generatebloodreport(formvalue).subscribe((response)=>{
        if(response)
          console.log("test report successfully generated into the database",response);
          alert(response.message);
          this.bloodreport.reset()
      },(error)=>{
        console.log("Test report not generated from the server",error);
      })
  }

  
  autocode(params:any)
  {
    console.log("samplereport",params);
    
    this.serveapi.gettestreport(params).subscribe((response)=>{
      console.log("autogenerate reports",response);
      if(params == response.docs[0].totalreport)
      {
        console.log('matched');
        this.numbercount += 1;
        console.log("counts",this.numbercount);
        this.bloodtestreport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numbercount;
        this.pdfname = this.bloodtestreport;
         this.bloodreport.controls['totalreport'].setValue(this.bloodtestreport);

      }
      else{
        console.log("Not matched id",params);
      }
      this.autocode(this.bloodtestreport);
        
    })
  }
  exit()
  {
   this.sendData.emit(1);
  }
  // generatepdf()
  // {
  //     var pdf = document.getElementById('print');
  //     html2canvas(pdf).then((canvas=>{
  //       var imgdata = canvas.toDataURL('images/png');
  //       var doc = new js();
  //       doc.addimage(imgdata,0,0,208,500);
  //       this.defaultOptions.output = this.pdfname;
  //       doc.save(this.defaultOptions.output);

  //     }))
  // }

  public openPDF(): void {
    let DATA: any = document.getElementById('print');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
     
    
      PDF.save( this.pdfname+'.pdf');
    });
  }

  fileChange(element) {
    const file = element.target.files[0];
    console.log(file);

    const formdata = new FormData();
    formdata.append("file",file);
    this.serveapi.post(formdata)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
}
upload() {
  let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
  }
  this.serveapi.post( formData)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
}
}


