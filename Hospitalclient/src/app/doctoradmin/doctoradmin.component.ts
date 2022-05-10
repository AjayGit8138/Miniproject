import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctoradmin',
  templateUrl: './doctoradmin.component.html',
  styleUrls: ['./doctoradmin.component.css']
})
export class DoctoradminComponent implements OnInit {
  doctoradmingroup:FormGroup;
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
