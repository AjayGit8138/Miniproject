import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
 
  ngOnInit(): void {
  }

 

  banner = "./images/medicalbanner.jpg";
  bannerone = "./images/hospitalbanner.jpg";
  services = "./images/goalmission.jpg";
  vision = "./images/vision.png";
  nervesicon = "./images/nervesicon.jpg";
  hearticon = "./images/hearticon.jpg"
  dentalicon = "./images/dentalicon.png";
  skinicon = "./images/skinmedical.jpg";
  generalicon = "./images/generalmedicine.png";


  makeappointment()
  {
      this.router.navigate(['patientregister']);
  }
}
