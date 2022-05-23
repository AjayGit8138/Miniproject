import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent implements OnInit {
  eyetreat = './images/eyetreatment.jpeg';
  hearttreat = './images/heart-care.jpeg';
  skintreat = './images/skintreatment.jpg';
  genmedicine = './images/Generalmedical.jpg';
  orthotreat = './images/orthotreatment.jpg';
  nerves = './images/nerves.jpg';
  banner = "./images/medicalbanner.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
