# Miniproject
Miniproject

Miniproject

Doctor Portal

1.Created Doctor Portal for Registration Doctor profile using certification no with degree proof and create a loginid for doctor crediatials.
2.Created Doctor Login Portal for registered doctor should be login with authentication using Loginid,email and password
3.After allocated patient to various doctors,the Patient history and Patient status will ber display under respective doctor's Portal.
4.The Doctor able to create a general medicinal remedies and generate a blood count and urine test reports under patient with updated patient reports.

Admin Portal
1.The Admin Portal is user for only Hospital purpose,The admin will track the Patient booking request and allocate the Available doctor the requested
patients depents upon the medicinal illness in general consulting.

2.Maintain the Doctor registeration list in Hospital.

3.The Time allocation for patient request Time will be changes depends upon the doctor available time,If the Doctor treating the patient on 11:00AM to 12:00PM 

Patient Portal

1.On Patient Portal First need to sign up and register the Patient account,after patient registration,the token id with patient last 4 digits of aadhar number will appended to Patienid Ex:Patient-2323
2.After successfull creation of patient registeration,The patient can be able to login with patient loginid using credentials and logged into the patient portal.

3.After Logged into the patient Portal,The patient can be able to book a appointment request.
4.If doctor is allocated to the patient,The patient can be directly consulting using the Your doctor form.

Technologies implemented

Frontend:

1.Angular 11 Cli
2.HTML,CSS and Angular Material,Bootstrap
3.Toastr Notifilcations
4.Session Handling

NPM Packages:

1.npm i ngx-toastr@13.2.1 
2.ng add @ng-bootstrap/ng-bootstrap
3.ng add @angular/material
4.npm install jspdf --save

Backend Technologies implemented:

1.Creating api connection using express Packages, creating app routing,creating api calls
2.Send a Notifilcations to the patient mail using Nodemailer package,while booking status.
3.api functions are implemented with a Promise(resolve,reject) function calls.
4.Implemented using three layers of operaions which is done in server side,
        *creating DB configuration files and Couchdb connection
        *creating api routing file which have all api calls
        *creating service layer's for doctor and patient's operations

NPM Packages used in server
1.Express package,
2.CORS
3.Nodemailer
4.JOI validation
5.multer upload and storage,
6.nano couchdb npm package
7.winston loggerfile log creation



