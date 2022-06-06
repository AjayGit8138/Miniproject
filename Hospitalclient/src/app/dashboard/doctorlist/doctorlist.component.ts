import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  doctorlist = [];
  errorstatus:boolean = false;
  constructor(private serveapi:ApiserviceService,private toastr:ToastrService) { }
  status:boolean = false;
  ngOnInit(): void {
    let referenceid = 'Doctor';
    this.serveapi.getdoctorslist(referenceid).subscribe((data)=>{
   
      if(data.status == 404)
      {
        this.errorstatus = true;
        this.showerror(data.failure);
      }
      else{
        const availength = data.data.docs.length;
        this.doctorlist = [];
        for(let i=0;i<availength;i++)
        {
          this.doctorlist.push(data.data.docs[i]);
        }
        this.showsuccess(data.success);
       
    }
    })
  
  }

  //toastr service
  showerror(message)
  {
    this.toastr.error(message);
  }
  showsuccess(message)
  {
    this.toastr.success(message);
  }
}
