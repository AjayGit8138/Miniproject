import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patientrack',
  templateUrl: './patientrack.component.html',
  styleUrls: ['./patientrack.component.css']
})
export class PatientrackComponent implements OnInit {

  constructor() { console.log("Constructor")}

  ngOnInit(): void {
    console.log("Constructor")
  }

}
