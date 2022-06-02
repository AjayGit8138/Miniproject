import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule,NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { PatientenquiryComponent } from './patientenquiry/patientenquiry.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctoradminComponent } from './doctoradmin/doctoradmin.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';

import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { SpecialityComponent } from './speciality/speciality.component';

import { AdminComponent } from './admin/admin.component';
import { TreatmentdivisionComponent } from './treatmentdivision/treatmentdivision.component';
import { TestanalysisComponent } from './testanalysis/testanalysis.component';
import { MypatientComponent } from './mypatient/mypatient.component';
import { OperationPipe } from './operation.pipe';
import {MatTabsModule} from '@angular/material/tabs';

import { FooterComponent } from './footer/footer.component';
import { BloodreportComponent } from './mypatient/bloodreport/bloodreport.component';
import { PatientlistComponent } from './dashboard/patientlist/patientlist.component';
import { DoctorlistComponent } from './dashboard/doctorlist/doctorlist.component';
import { PatientrackComponent } from './patientdashboard/patientrack/patientrack.component';
import { PatientsignupComponent } from './patientsignup/patientsignup.component';
import { SymptomsformComponent } from './patientdashboard/symptomsform/symptomsform.component';
import { DisplayreportComponent } from './patientdashboard/displayreport/displayreport.component';
import { BloodcountComponent } from './mypatient/bloodcount/bloodcount.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { YourdoctorComponent } from './patientdashboard/yourdoctor/yourdoctor.component';



@NgModule({
  declarations: [
    AppComponent,
    PatientenquiryComponent,
    DoctoradminComponent,
    PatientloginComponent,
    DoctorloginComponent,
    DashboardComponent,
    HeaderComponent,
    PatientdashboardComponent,
    HomeComponent,
    SpecialityComponent,
    AdminComponent,
    TreatmentdivisionComponent,
    TestanalysisComponent,
    MypatientComponent,
    OperationPipe,
    FooterComponent,
    BloodreportComponent,
    PatientlistComponent,
    DoctorlistComponent,
    PatientrackComponent,
    PatientsignupComponent,
    SymptomsformComponent,
    DisplayreportComponent,
    BloodcountComponent,
    MenuComponent,
    YourdoctorComponent
  ],
  imports: [
    BrowserModule,NgbModalModule,MatTabsModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,MatSidenavModule, ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
    BrowserAnimationsModule,MatToolbarModule, NgbModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
