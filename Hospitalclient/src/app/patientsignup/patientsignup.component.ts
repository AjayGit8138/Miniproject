import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patientsignup',
  templateUrl: './patientsignup.component.html',
  styleUrls: ['./patientsignup.component.css']
})
export class PatientsignupComponent implements OnInit {
  patientsignupform:FormGroup
  constructor() { }

  ngOnInit(): void {
  }

}
