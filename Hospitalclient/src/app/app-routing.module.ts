import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctoradminComponent } from './doctoradmin/doctoradmin.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { PatientenquiryComponent } from './patientenquiry/patientenquiry.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';

const routes: Routes = [
  {path:'enquiry',component:PatientenquiryComponent},
  {path:'docadmin',component:DoctoradminComponent},
  {path:'patientlogin',component:PatientloginComponent},
  {path:'patientregister',component:PatientenquiryComponent},
  {path:'doclogin',component:DoctorloginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
