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
    init: function() { console.log("pdf") },
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

  submitbooldsample(formvalue:any,_ref:any)
  {
      console.log("Formvalues",formvalue);
      this.makepdf.push(formvalue);
      this.arrayofkey = Object.keys(this.makepdf[0]);
      console.log(this.makepdf);
      formvalue.docid = localStorage.getItem('doctorid');
      this.serveapi.generatebloodreport(formvalue).subscribe((response)=>{
        if(response)
        {
          console.log("test report successfully generated into the database",response);

          this.bloodreport.reset()
        }
      },(error)=>{
        console.log("Test report not generated from the server",error);
      })
  }

  //autogenerate test report code based on previous report
  autocode(params:any)
  {
    console.log("samplereport",params);
    
    this.serveapi.gettestreport(params).subscribe((data)=>{
      if(params == data.data.docs[0].totalreport)
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

download()
{
  let item = 'WIN_20220404_12_24_49_Pro.jpg';
  this.serveapi.getfile(item).subscribe((data)=>{
    console.log("Data downloading",data);
  })
}
upload() {
  let formData = new FormData();
  for (const element of this.uploadedFiles) {
      formData.append("uploads[]", element, element.name);
  }
  this.serveapi.post( formData)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
}

//get setters for form validation

get patientId() {return this.bloodreport.get('patientId');}

get patientname() {return this.bloodreport.get('patientname')}
get reportby()  {return this.bloodreport.get('reportby')}
get totalreport() {return this.bloodreport.get('totalreport')}
get urinsugar() {return this.bloodreport.get('urinsugar')}
get acetone() {return this.bloodreport.get('acetone')}
get bloodsugarlevels() {return this.bloodreport.get('bloodsugarlevels')}

}


