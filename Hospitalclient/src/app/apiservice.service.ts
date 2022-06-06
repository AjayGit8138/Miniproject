
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 idgen:number = 0;

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')

  constructor(private http:HttpClient) {
    
   }


   //All API calls service to the Backend connection
   setloggedIn(value:boolean)
   {
     this.loggedInStatus = value;
   }
   getTotalPatients(getcategory:any,getlist:any)
  {
   return this.http.get<any>('http://localhost:8000/totalPatients/'+getcategory+'/'+getlist);
  }
  storePatientRecord(formobject:any)
  {
    return this.http.post<any>('http://localhost:8000/storePatient/',formobject);
  }
  checkPatientLogin(Formvalue:any)
  {
    return this.http.get<any>('http://localhost:8000/checkPatientLogin/'+Formvalue);
  }
  storeDoctorProfile(doctorform:any)
  {
    return this.http.post<any>('http://localhost:8000/saveDoctorProfile/',doctorform);
  }
  checkDoctorLogin(doctorlogin:any)
  {
    console.log("doctorlogin",doctorlogin);
    return this.http.get<any>('http://localhost:8000/doctorLoginAuth/'+doctorlogin);
  }
  getRequestedPatient()
  {
    return this.http.get<any>('http://localhost:8000/bookRequested/');
  }
  bookAppointment(appoint:any,refid:any)
  {
    console.log("Bookappointment",refid);
    return this.http.put<any>('http://localhost:8000/updatePatienRecord/'+refid,appoint);
  }
  getDoctorslist(getreference:any)
  {
    let doctor = getreference;
    return this.http.get<any>('http://localhost:8000/getDoctorDetails/'+doctor);
  }
  getTablets(reference:any){
    return this.http.get<any>('http://localhost:8000/getTablets/'+reference);
  }
  generateTestReport(object:any)
  {
    return this.http.post<any>('http://localhost:8000/generatemedicalreport',object);
  }
  getTestReport(id:any)
  {
    return this.http.get<any>('http://localhost:8000/getreport/'+id);
  }
  generateBloodReport(object:any)
  {
    return this.http.post<any>('http://localhost:8000/bloodreport',object);
  }
  deletePatient(object:any)
  {
    return this.http.delete<any>('http://localhost:8000/deletePatient/'+object._id+'/'+object._rev);
  }
  postData(formData:any){
    return this.http.post<any>('http://localhost:8000/upload/',formData);
  }
  getAdmin(request:any)
  {
    return this.http.post<any>('http://localhost:8000/admin/',request);
  }
  postConsulting(consulting:any)
  {
    return this.http.post<any>('http://localhost:8000/consulting',consulting);
  }
  getAdmittedPatients()
  {
    return this.http.get<any>('http://localhost:8000/admittedPatients');
  }
  generateBloodCountReport(bloodcountreport:any)
  {
     return this.http.post<any>('http://localhost:8000/bloodCountReport',bloodcountreport)
  }
  getFile(report:any)
  {
    console.log("report",report);
    let body = {filename:report};
    return this.http.post(`http://localhost:8000/download`, body, {
      responseType : 'blob',
  });
  }
  getDoctor(doctor:any)
  {
    return this.http.get<any>('http://localhost:8000/senddoctor/'+doctor);
  }
  directBooking(booking:any)
  {
    return this.http.post<any>('http://localhost:8000/directbook',booking);
  }
  getTimeSlot(timeslot:any)
  {
    return this.http.get<any>('http://localhost:8000/timeSlot/'+timeslot.doctorname + '/' + timeslot.docid);
  }
}
 

