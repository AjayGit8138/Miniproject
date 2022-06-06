import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorlistComponent } from './dashboard/doctorlist/doctorlist.component';
import { PatientlistComponent } from './dashboard/patientlist/patientlist.component';
import { DoctoradminComponent } from './doctoradmin/doctoradmin.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { HomeComponent } from './home/home.component';
import { BloodreportComponent } from './mypatient/bloodreport/bloodreport.component';
import { MypatientComponent } from './mypatient/mypatient.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { PatientenquiryComponent } from './patientenquiry/patientenquiry.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';

import { AuthguardGuard } from './shared/authguard.guard';
import { SpecialityComponent } from './speciality/speciality.component';
import { TestanalysisComponent } from './testanalysis/testanalysis.component';
import { TreatmentdivisionComponent } from './treatmentdivision/treatmentdivision.component';
import { DoctorauthGuard } from './shared/doctorauth.guard';
import { PatientGuard } from './shared/patient.guard';
import { SymptomsformComponent } from './patientdashboard/symptomsform/symptomsform.component';
import { DisplayreportComponent } from './patientdashboard/displayreport/displayreport.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { YourdoctorComponent } from './patientdashboard/yourdoctor/yourdoctor.component';

const routes: Routes = [
  {path:'enquiry',component:PatientenquiryComponent},
  {path:'docadmin',component:DoctoradminComponent},
  {path:'patientlogin',component:PatientloginComponent},
  {path:'patientregister',component:PatientenquiryComponent},
  {path:'adminauth',component:AdminComponent},
  {path:'doclogin',component:DoctorloginComponent},
  {path:'docdash/:id',component:DashboardComponent,canActivate : [AuthguardGuard] ,
    children:[
      {path:'enquirypatients',component:PatientlistComponent},
      {path:'doclist',component:DoctorlistComponent},
      {path:'menu',component:MenuComponent},
      {path:'',redirectTo:'enquirypatients', pathMatch: 'full' },
    ],
  },
  {path:'patientdashboard/:id',component:PatientdashboardComponent,canActivate : [PatientGuard],
      children:[
        {path:'enquiryform/:id/:name',component:SymptomsformComponent},
        {path:'displayreport/:id',component:DisplayreportComponent},
        {path:'yourdoctor/:id',component:YourdoctorComponent},
        
        
      ]
},
  {path:'home',component:HomeComponent},
  {path:'specialists',component:SpecialityComponent},
  {path:'treat',component:TreatmentdivisionComponent,
  children: [
    {path:'',redirectTo:'mypatient/:id', pathMatch: 'full' },
    { path: 'mypatient/:id', component: MypatientComponent,canActivate : [DoctorauthGuard],
        children:[
          { path: 'analyze/:id/:name/:docid/:docname', component: TestanalysisComponent},
          {path:'bloodreport',component:BloodreportComponent}
        ]
  },
]
}, 
  {path:'treat/:id',component:TreatmentdivisionComponent,
children: [
  { path: 'mypatient', component: MypatientComponent,
      children:[
        { path: 'analyze/:id/:name/:docid/:docname', component: TestanalysisComponent},
      ]
  }
]},

  {path:'',redirectTo:'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
