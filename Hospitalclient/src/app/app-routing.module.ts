import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctoradminComponent } from './doctoradmin/doctoradmin.component';
import { PatientenquiryComponent } from './patientenquiry/patientenquiry.component';

const routes: Routes = [
  {path:'enquiry',component:PatientenquiryComponent},
  {path:'docadmin',component:DoctoradminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
