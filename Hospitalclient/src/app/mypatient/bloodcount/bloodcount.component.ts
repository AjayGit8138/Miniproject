import { Component, OnInit,Input, Output,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
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
  bloodcount:FormGroup;
  @Input () bloodtest:any; 
  @Input () reference:any;
  @Input () doctorid:any;
 
  uploadedFiles: Array < File > ;
  pdfname:any;
  numbercount:number = 1;
  divboolean:any;
  bloodcountreport:any;
  currentdate:any;
  makepdf = [];
  arrayofkey = [];
  @Output() public sendData = new EventEmitter<number>();
  constructor(private router:Router,private bloodtestform:FormBuilder,private serveapi:ApiserviceService,private toastr:ToastrService) {
    this.bloodcount = this.bloodtestform.group({
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
    console.log(this.bloodtest);
    console.log("doctorid",this.doctorid)
    this.bloodcount.controls['patientId'].setValue(this.bloodtest.id);
    this.bloodcount.controls['patientname'].setValue(this.bloodtest.name);
    
    this.bloodcountreport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numbercount;
    this.autocode(this.bloodcountreport);
    console.log("autogenerate blood",this.bloodcountreport);
    this.bloodcount.controls['reportby'].setValue(this.bloodtest.generatedby);
    this.bloodcount.controls['totalreport'].setValue(this.bloodcountreport);

    this.currentdate = new Date();
  }
  submitbooldsample(formvalue:any,ref:any)
  {
   
      console.log("Formvalues",formvalue);
      this.makepdf.push(formvalue);
      this.arrayofkey = Object.keys(this.makepdf[0]);
      console.log(this.makepdf);
      formvalue.docid = localStorage.getItem('doctorid');
      this.serveapi.generatebloodcountreport(formvalue).subscribe((response)=>{
        console.log("response message",response);
        if(response.status == 200)
        {
          console.log("test report successfully generated into the database",response);
         
          this.showsuccess(response.success);
          this.bloodcount.reset()
        }
      
      },(error)=>{
        this.showerror("can't generate report");
        console.log("Test report not generated from the server",error);
      })
  }

  //autogenerate test report based on Previous report
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
        this.bloodcountreport = this.bloodtest.id + '-' + this.reference + '-' + 'Testreport' + '-' + this.numbercount;
        this.pdfname = this.bloodcountreport;
        console.log("Pdfname",this.pdfname);
         this.bloodcount.controls['totalreport'].setValue(this.bloodcountreport);

      }
      else{
        console.log("Not matched id",params);
      }
      this.autocode(this.bloodcountreport);
        
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
     
    
      PDF.save( this.pdfname+'.pdf');
    });
  }


    showsuccess(message)
    {
      this.toastr.success(message);
    }
    showerror(message)
    {
      this.toastr.error(message);
    }
    
    get patientId() {return this.bloodcount.get('patientId');}

get patientname() {return this.bloodcount.get('patientname')}
get reportby()  {return this.bloodcount.get('reportby')};
get totalreport() {return this.bloodcount.get('totalreport')}
get Rbc() {return this.bloodcount.get('Rbc')}
get hemoglobin() {return this.bloodcount.get('hemoglobin')}
get hemocrit() {return this.bloodcount.get('hemocrit')}
get mcv() {return this.bloodcount.get('mcv')}

get mch() {return this.bloodcount.get('mch')}

get rdw() {return this.bloodcount.get('rdw')}



}
