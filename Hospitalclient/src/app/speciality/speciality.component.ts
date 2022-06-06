import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent implements OnInit {
  eyeTreat = './images/eyetreatment.jpeg';
  heartTreat = './images/heart-care.jpeg';
  skinTreat = './images/skintreatment.jpg';
  genMedicine = './images/Generalmedical.jpg';
  orthoTreat = './images/orthotreatment.jpg';
  nerves = './images/nerves.jpg';
  banner = "./images/medicalbanner.jpg";
  constructor() { 
    console.log("Constructor")  }

  ngOnInit(): void {
    
    console.log("Constructor")
  
  }

}
