import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


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
    SpecialityComponent
  ],
  imports: [
    BrowserModule,NgbModalModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,MatSidenavModule,ToastrModule.forRoot(),
    BrowserAnimationsModule,MatToolbarModule, NgbModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }