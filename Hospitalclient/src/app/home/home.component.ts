import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  images = [
    {title: 'First Slide', short: 'First Slide Short', src: "./images/hospitalbanner.jpg"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "./images/Banner_01_edited.jpg"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "./images/Generalmedical.jpg"}
  ];
  
  constructor(private router:Router, config: NgbCarouselConfig) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  ngOnInit(): void {
    console.log("Constructor");
  
  }

 

  banner = "./images/home-img.svg";
  bannerone = "./images/hospitalbanner.jpg";
  services = "./images/goalmission.jpg";
  vision = "./images/icons8-vision-64.png";
  nervesicon = "./images/nervesicon.jpg";
  hearticon = "./images/hearticon.jpg"
  dentalicon = "./images/dentalicon.png";
  skinicon = "./images/skinmedical.jpg";
  generalicon = "./images/generalmedicine.png";
  orthoicon = "./images/bonebroken.jpg";



  makeappointment()
  {
      this.router.navigate(['patientregister']);
  }
}
