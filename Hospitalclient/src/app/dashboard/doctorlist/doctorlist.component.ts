import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  doctorList = [];
  errorStatus:boolean = false;
  constructor(private serveApi:ApiserviceService,private toastrService:ToastrService) { }
  status:boolean = false;
  ngOnInit(): void {
    let referenceId = 'Doctor';
    this.serveApi.getDoctorslist(referenceId).subscribe((data)=>{
   
      if(data.status == 404)
      {
        this.errorStatus = true;
        this.showError(data.failure);
      }
      else{
        const availength = data.data.docs.length;
        this.doctorList = [];
        for(let i=0;i<availength;i++)
        {
          this.doctorList.push(data.data.docs[i]);
        }
        this.showSuccess(data.success);
       
    }
    })
  
  }

  //toastr service
  showError(message)
  {
    this.toastrService.error(message);
  }
  showSuccess(message)
  {
    this.toastrService.success(message);
  }
}
