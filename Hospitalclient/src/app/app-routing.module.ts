import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctoradminComponent } from './doctoradmin/doctoradmin.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { HomeComponent } from './home/home.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { PatientenquiryComponent } from './patientenquiry/patientenquiry.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { SpecialityComponent } from './speciality/speciality.component';

const routes: Routes = [
  {path:'enquiry',component:PatientenquiryComponent},
  {path:'docadmin',component:DoctoradminComponent},
  {path:'patientlogin',component:PatientloginComponent},
  {path:'patientregister',component:PatientenquiryComponent},
  {path:'doclogin',component:DoctorloginComponent},
  {path:'docdash',component:DashboardComponent},
  {path:'patientdashboard',component:PatientdashboardComponent},
  {path:'home',component:HomeComponent},
  {path:'specialists',component:SpecialityComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
