import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctoradminComponent } from './doctoradmin/doctoradmin.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { HomeComponent } from './home/home.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { PatientenquiryComponent } from './patientenquiry/patientenquiry.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { TreatmentdivisionComponent } from './treatmentdivision/treatmentdivision.component';

const routes: Routes = [
  {path:'enquiry',component:PatientenquiryComponent},
  {path:'docadmin',component:DoctoradminComponent},
  {path:'patientlogin',component:PatientloginComponent},
  {path:'patientregister',component:PatientenquiryComponent},
  {path:'adminauth',component:AdminComponent},
  {path:'doclogin',component:DoctorloginComponent},
  {path:'docdash',component:DashboardComponent},
  {path:'patientdashboard/:id',component:PatientdashboardComponent},
  {path:'home',component:HomeComponent},
  {path:'specialists',component:SpecialityComponent},
  {path:'treat',component:TreatmentdivisionComponent},
  {path:'treat/:id',component:TreatmentdivisionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
