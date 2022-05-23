import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
 
  ngOnInit(): void {
  }

 

  banner = "./images/medicalbanner.jpg";
  bannerone = "./images/hospitalbanner.jpg";
  services = "./images/goalmission.jpg";
  vision = "./images/vision.png";
}
