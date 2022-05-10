import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctoradmin',
  templateUrl: './doctoradmin.component.html',
  styleUrls: ['./doctoradmin.component.css']
})
export class DoctoradminComponent implements OnInit {
  doctoradmingroup:FormGroup;
  courses = ['MBBS,MD in Genereal Medicine','MBBS,MS in Obstetrics','MBBS,MD,DM in Cardiology','MBBS,MS,MCH in Vascular Surgery','MBBS in ENT (Ear, Nose and Throat)','MBBS in Ophthalmology','MBBS in General Medicine','MBBS in Orthopaedics','MBBS in General Surgery','MBBS in Anaesthesiology','MBBS in Obstetrics & Gynaecology','MBBS in Psychiatry','MBBS in Paediatrics']
  constructor(private fb:FormBuilder) {
    this.doctoradmingroup = this.fb.group({
      doctorname:[''],
      email:[],
      dateofbirth:[''],
    })

   }
  step:any = 1;
  ngOnInit(): void {
  }

  checkfile(event:any)
  {

  }
  navigatenext()
  {
    this.step += 1;
  }
}
