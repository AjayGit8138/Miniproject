//includes imports
const connection = require('express');
const bodyparser = require('body-parser');
const patientlist = require('./services/patientoperation');
const app = connection();
const port = 8000;
const cors = require('cors');
const dbConnect = require('./db/dbconnection');
const doctorfile = require('./services/doctorsparser');
const patientParse = require('./services/patientoperation');
const generatelogger = require('./logger/logger');
const controller = require('./controller/doctorcontroller');
const errorlog = require('./logger/errorlog');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const {schema,adminauth,reportvalidation,urinetestreport,countreport,booking} = require('./validatior');
const {schemadoctor} = require('./doctorvalidator');
const { response } = require('express');
app.use(connection.static('public'));
app.use(bodyparser.json());
app.disable("x-powered-by");
const pathmodule = require('path');

//cors implementation
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));

//Multer stroage functions
const storage = multer.diskStorage({
  destination:function(_req,_file,cb){
    cb(null,"uploads");
  },
  filename:function(_req,file,cb){
   let originalname = file.originalname;
    console.log("orginal name",originalname);
    cb(null,originalname);
    console.log("orginal name",originalname);
  }
})
const upload = multer({
  storage:storage,
  limits: {
    fileSize: 8000000
 }
});
//Multer storage functions ends

//api routing calls starts from here


//Get AdmittedPatients
app.get('/admittedPatients', function(_req, res){
      patientParse.admitted().then((data)=>{
        if(data)
        {
          res.status(200).send({
            data:data,
            message:"Admitted Patients Details fetched From database"
          })
        }
        else{
          const errorStatus = {
            status:422,
            failure:"Admitted Patients Not Found in Database"
          }
          errorlog.error("Error" + `${errorStatus.failure}` + "statusCode:-" + `${errorStatus.status}`);
        }
      }).catch((err)=>{
        generatelogger.error("can't fetch admittedpatients details from the server" + err);
      })
});



//api Call for Upload a file
app.post('/upload', upload.single("file"), (req, res) => {
 

  const file = req.file;
  console.log("filenames",file);
  if(file)
  {
    const fileStatus = {
      status:200,
      message:"Files Upload Successfully"
    }
    res.json(fileStatus);
  }
  else{
    const errorStatus = {
      status:404,
      failure:"Files Not Uploaded Successfully! Files Missing"
    }
    errorlog.error("Error" + `${errorStatus.failure}` + "Statuscode:-" + `${errorStatus.status}`);
  }
 
});

//Get Totalpatientsby Id and Refid

app.get('/totalPatients/:id/:refid',(req,res)=>{
   
    const fetchData ={
      "selector": {
         "treatmentcategory": req.params.refid,
         "doctor": req.params.id,
         "type":"patient-request"
      }
   }
    
    controller.fetchPatients(fetchData).then((data)=>{
      console.log("Get Patient datas from database",data);
      generatelogger.info("successfully get Patient details from database");
      if(data.bookmark == 'nil') 
      {
        const stat = {failure:"Patient datas is Not Found in Server",status:404};
        errorlog.error("Error" + `${stat.failure}` + "status" + `${stat.status}`);
        res.json(stat);
      }
      else
        res.status(200).send({success:"Patient data's Successfully fetched from database",data:data})
      
    }).catch((err)=>{
      console.log("Whoo Patient is not available",err);
    })
})
//store Patient data into the database
app.post('/storePatient',(req,res)=>{
  const { error } = schema.validate(req.body)
  console.log("validation",error);
    if(error === undefined)
    {
    const storeObject = {
      patientname:req.body.patientname,
      age:req.body.age,
      dateofbirth:req.body.dateofbirth,
      mobileno:req.body.mobileno,
      email:req.body.email,
      esino:req.body.esino,
      aadharno:req.body.aadharno,
      requestId:req.body.requestId,
      password:req.body.password,
     
      type:"Patient"
    }
   
    controller.storePatientdata(storeObject).then((data)=>{
      console.log("Patient data is stored into the database",data);
      generatelogger.info("Patient data is stored into the database");
      if(data)
        res.status(201).send({
          message:"Patient data is successfully generated"
        })
    }).catch((err)=>{
      console.log("Err cant to add into database",err);
      generatelogger.error("Patient data is not stored into the database"+err);
    })
    }
    else{
      errorlog.error("Error in validation",patientvalidation);
    }
})
//checklogin authentication for patient
app.get('/checkPatientLogin/:objectid',(req,res)=>{

  dbConnect.getLoginDetails(req.params.objectid).then((data)=>{
      console.log("from router ",data);
      if(data.bookmark == 'nil')
      {
        const stat = {failure:"Patient Is not available in Patient category",status:404}
        errorlog.error("Error" + `${stat.failure}` + "status:-" + `${stat.status}` );
        res.json(stat);
      }
      else
        res.status(200).send({message:"Patient is Available in patient category",data:data});
      
     
  }).catch((err)=>{
    generatelogger.error("Patientlogin authentication Failed"+ err);
  })
});

//get tablets list
app.get('/getTablets/:id',(req,res)=>{
  

            controller.pharMacy(req.params.id).then((data)=>{
     
            generatelogger.info("Files transfer from server");
            
              if(data.bookmark == 'nil')
              {
          
             const stat = {
              failure: 'Cant Fetch from database is an error!',status:404
           }
            errorlog.error("Error" + `${stat.failure}` + "status" + `${stat.status}`);
            res.json(stat);
            }
              else
                res.status(200).send({success:"Tabletlist is Successfully fetched from database",data:data});
          
          }).catch((err)=>{
            console.log("Error from server",err);
            res.send("Server Down Cant fetch Details");
          })
})
//save doctor Profile into the server
app.post('/saveDoctorProfile',(req,res)=>{
          const {error} = schemadoctor.validate(req.body);
          if(error == undefined)
          {
          controller.storeDoctorDetails(req).then((success=>{

          console.log("Hi Doctor information stored into the server",success);
          if(success)
          {
            res.status(201).send({
              message:"Doctor Profile is successfully Stored into the database"
            })
          }
          else{
            let profileStatus = {
              failure:"Doctor Profile is Not able to stored into the database",
              status:422
            }
            errorlog.error("Error" + `${profileStatus.failure}` + "statusCode:-" + `${profileStatus.status}`);
          }
        })).catch((err=>{
          console.log("Some Bad updation Doctor profile is not uploaded into the server",err);
          errorlog.error("Some Error occurs while saving a Doctor Profile",err);
        }))
      }
      else{
        console.log("Error",validerror);
      }
})

//get BookRequested
app.get('/bookRequested',(_req,res)=>{
  const book = {
    selector:{
        "type":"patient-request",
        "appointmentstatus":"NO"
    }
}
      controller.bookingStat(book).then((data)=>{
        console.log("waiting for book details",data);
        if(data.bookmark == 'nil')
        {
          const stat = {failure:"Booked Patients Not Available in Our Hospital",status:404};
          errorlog.error("Error"+`${stat.failure}` + "status Code:-"+ `${stat.status}` );
          res.json(stat);
          
        }
        else
          res.status(200).send({success:"Patients Available In our Hospital",data:data});
      
      }).catch((err)=>{
          console.log("Get Booking status error",err);
          generatelogger.error("Can't get a details from ther server");
      })
})

//get DoctorloginAuthentication
app.get('/doctorLoginAuth/:objectid',(req,res)=>{
 
  controller.checkDoctorLogin(req.params.objectid).then((data)=>{
    console.log("Successfully data received from server",data);
    generatelogger.info("Doctor auth proceess is done");
    if(data.bookmark == 'nil')
    {
      const stat = {failure:"Doctor Not available in Hospital",status:404};
      errorlog.error("Error" + `${stat.failure}` + "Status" + `${stat.status}`)
      res.json(stat);
    }
    else
      res.status(200).send({success:"Doctor available in Hospital",data:data});
    
}).catch((err)=>{
  console.log("Error from server",err);
  res.send("Server Down Cant fetch Details");
})
})

//get admin priveliages
app.post('/admin',(req,res)=>{
  console.log(req.body.loginid);
  console.log(req.body.password);
  const {error } = adminauth.validate(req.body);
  if(error == undefined)
  {
  controller.adminCheck(req.body.loginid).then((data)=>{
    if(data.bookmark == 'nil')
    {
      const stat = {failure:"Admin Not available with a Particular Id",status:404}
      errorlog.error("Error" + `${stat.failure}` + "Status" + `${stat.status}`);
      res.json(stat);
    }
    else
      res.status(200).send({success:"Admin available in database",data:data});
  
  })
  }
  else{
    console.log("error validation",error);
      errorlog.error("Admin Authentication Failed due to the Invalid username or Password");
  }
})

//getDoctordetails
app.get('/getDoctorDetails/:id',(req,res)=>{
  let doctorSearch;
  if(req.params.id == 'Doctor')
  {
  doctorSearch = {
    selector:{
        "type":req.params.id,
    }
    }
  }
  else{
    doctorSearch = {
      selector:{
        "type":"Doctor",
        "specialist":req.params.id
      }
    }
  }
  if(doctorSearch)
  {
    controller.docsList(doctorSearch).then((data)=>{
      console.log("Doctors available in Hospital",data);
      if(data.bookmark == 'nil')
      {
        const stat = {failure:"Doctors Not available in Hospital",status:404}
        errorlog.error("Error" + `${stat.failure}` + "Status" + `${stat.status}`);
        res.json(stat);
      }
      else{
        const stat = {success:"Doctors available in Hospital",data:data,status:200}
         res.json(stat);
         generatelogger.info("Success:" + `${stat.success}` + "Status:-" + `${stat.status}`)
      }
    
    }).catch((err)=>{
      console.log("Some Bad request Error occured",err);
      res.send("Error server down");
    })
  }
})


//update Patientbookinf recored
app.put('/updatePatienRecord/:updateobject',(req,res)=>{
    const patientId = req.params.updateobject;
    const updatePatient = {
      tokenname:req.body.tokenName,
      doctorid:req.body.docId,
      treatmentcategory:req.body.treatmentCategory,
      doctorassign:req.body.assignDoctor,
      appointmentstatus:req.body.appointStatus,
      timingforappointment:req.body.timingforAppointment,
      dateofappointment:req.body.dateofAppointment
    }
    
       const retmessage = controller.waitingForBook(updatePatient,patientId).then((resdata)=>{
      console.log("Updated Appointment Booking status successfully",resdata);

      //return response
      return resdata;
    
    }).catch((err)=>{
      console.log("Something Bad request Can't update",err);
      generatelogger.error("Bad Request Can't updated The booking patient request");
    })

    //return response
    if(retmessage!=undefined)
    {
      const stat = {
        success:"Hi Admin Patient Data is successfull updated",status:200
      }
     res.json(stat);
     generatelogger.info("Success:" + `${stat.success}` + "StatusCode:-" + `${stat.status}`);
    }
    else
    {
      const stat = {
        failure:"Patient Booking Status is Failed due to Bad Request",status:404
      }
      errorlog.error("Error" + `${stat.failure}` + "Status" + `${stat.status}`);
    }
      
})
//generate medical general report
app.post('/generateMedicalReport',(req,res)=>{
        const {error} = reportvalidation.validate(req.body);
        console.log("Report validation",error);
        if(error)
        {
          const medicalStatus = {
              status:422,
              message:"Data Is Not Valid"
          }
         res.json(medicalStatus);
        }
        else{
        const Object = {
          dietplan:req.body.dietplan,
          diseases:req.body.diseases,
          dosage:req.body.dosage,
          medicineone:req.body.medicineone,
          medicinetwo:req.body.medicinetwo,
          medicinethree:req.body.medicinethree,
          requestId:req.body.patientId,
          patientname:req.body.patientname,
          precuations:req.body.precuations,
          remedies:req.body.remedies,
          reportby:req.body.reportby,
          tablets:req.body.tabletscategory,
          totalreport:req.body.totalreport,
          filename:req.body.filename,
          docid:req.body.docid,
          dateofreport:new Date()
                } 
            
            controller.reportGeneration(Object).then((data)=>{
            console.log("Successfully data received from server",data);
         
            if(data){
             
              const stat = {
                success:"Patient MedicalReport is successfully generated",status:200
              }
              res.json(stat);
              generatelogger.info("Success:" + `${stat.success}` + "Statuscode" + `${stat.status}`);
            }
            else
            {
              const stat ={failure:"Patient Medical Report is Not generated Successfulyy",status:404}
              errorlog.error("Error" + `${stat.failure}` + "Statuscode:-" `${stat.status}`);
            }
        }).catch((err)=>{
          console.log("Error from server",err);
          res.send("Server Down Cant fetch Details");
  })
}
})

//generate UrineTest Report
app.post('/bloodreport',(req,res)=>{
 
  const {error} = urinetestreport.validate(req.body);
    if(error)
    {
      const medicalValidate = {
        status:422,
        message:"Data not found"
      }
      res.json(medicalValidate);
      console.log("Error validation",error);
      errorlog.error("Error" + `${medicalValidate.message}` + "statuscode:-" + `${medicalValidate.status}`);
    }
    else{
  const Object = {
      totalreport:req.body.totalreport,
      acetone:req.body.acetone,
      bloodsugarlevels:req.body.bloodsugarlevels,
      patientId:req.body.patientId,
      patientname:req.body.patientname,
      reportby:req.body.reportby,
      urinsugar:req.body.urinsugar,
      docid:req.body.docid,
      type:"test-report"
          } 
    
      controller.reportGeneration(Object).then((data)=>{
      console.log("Successfully data received from server",data);
      generatelogger.info("Testreport is successfully generated into server from indexjs");
      if(data){
             
        const stat = {
          success:"Patient MedicalReport is successfully generated",status:200
        }
        res.json(stat);
        generatelogger.info("Success:" + `${stat.success}` + "Statuscode" + `${stat.status}`);
      }
      else
      {
        const stat ={failure:"Patient Medical Report is Not generated Successfulyy",status:404}
        errorlog.error("Error" + `${stat.failure}` + "Statuscode:-" `${stat.status}`);
      }
  }).catch((err)=>{
    console.log("Error from server",err);
    res.send("Server Down Cant fetch Details");
})
    }
})

//blood Count Report
app.post('/bloodCountReport',(req,res)=>{
 
  const {error } = countreport.validate(req.body);

  if(error)
  {
    const reportStatus = {
      status:422,
      message:"Data Not found"
    }
    res.status(422).send({message:"Invalid you entered data error"});
    console.log("Error",error);
    errorlog.error("Error:-" + `${reportStatus.message}` + "Statuscode:-" + `${reportStatus.status}`)
  }
  else{
  const object = {
      totalreport:req.body.totalreport,
      Rbc:req.body.Rbc,
      hemocrit:req.body.hemocrit,
      hemoglobin:req.body.hemoglobin,
      mch:req.body.mch,
      mcv:req.body.mcv,
      patientId:req.body.patientId,
      patientname:req.body.patientname,
      rdw:req.body.rdw,
      reportby:req.body.reportby,
      docid:req.body.docid,
      type:"test-report"
          } 
      console.log("Save testReport",object);
      controller.reportGeneration(object).then(function (data) {
          console.log("Successfully data received from server", data);
          generatelogger.info("Testreport is successfully generated into server from indexjs");
          if (data) {

            const stat = {
              success: "Patient MedicalReport is successfully generated", status: 200
            };
            res.json(stat);
            generatelogger.info("Success:" + `${stat.success}` + "Statuscode" + `${stat.status}`);
          }

          else {
            const stat = { failure: "Patient Medical Report is Not generated Successfulyy", status: 404 };
            errorlog.error("Error" + `${stat.failure}` + "Statuscode:-" `${stat.status}`);
          }

        }).catch((err)=>{
    console.log("Error from server",err);
    res.send("Server Down Cant fetch Details");
})
  }
})


//Download from Frontend
app.post('/download',(req,res)=>{
  console.log("filename",req.body.filename);

  const filePath = path.join(__dirname,'./uploads/')  + req.body.filename;
 
  const resolvedPath = pathmodule.resolve(filePath);
  if (resolvedPath.startsWith(__dirname + './uploads')) { 
    fs.readFileSync(resolvedPath, { encoding: 'utf8', flag: 'r' }); 
    
  }
  res.sendFile(resolvedPath);
 
})

//getreport by id
app.get('/getreport/:id',(req,res)=>{
     
            controller.getReport(req.params.id).then((data)=>{
       
            if(data){
             
              const stat = {
                success:"Medical report is successfully Transferred from server",status:200,data:data
              }
              res.json(stat);
              generatelogger.info("Success:" + `${stat.success}` + "Statuscode" + `${stat.status}`);
            }
            else
            {
              const stat ={failure:"Medical report is Not Transferred from server",status:404}
              errorlog.error("Error" + `${stat.failure}` + "Statuscode:-" `${stat.status}`);
            }
        }).catch((err)=>{
          console.log("Error from server",err);
          res.send("Server Down Cant fetch Details");
  })

})

//Post directbook
app.post('/directbook',((req,res)=>{
    console.log("Calling");
    const {error} = booking.validate(req.body);
    console.log("Error validation",error);
    if(error)
    {
      const invalidBook = {
        status:422,
        failure:"Empty Field is Entered while Entering the form"
      }
      res.json(invalidBook);
    }else{
    const directBooking = {
      appointmentdata:req.body.appointmentdata,
      appointmenttime:req.body.appointmenttime,
      dbdoctorid:req.body.dbparentid,
      doctorname:req.body.doctorname,
      patientid:req.body.patientid,
      specialist:req.body.specialist,
      dbpatientid:req.body.dbrefpatientid,
      type:"bookrequest"
    }
    console.log("Directbook",directBooking);
    patientParse.appointBook(directBooking).then((data)=>{
      if(data)
      {
        const resSatus = {
          status:201,
          message:"successfully inserted into the database"
        }
        res.json(resSatus);
      }
      else
        res.status(404).send({failure:"Can't handle your data Not inserted into the database"})
    })
  }
}))

//get TimeSlot checking while Booking
app.get('/timeSlot/:name/:id',((req,res)=>{

  doctorfile.timeSlot(req.params.name,req.params.id).then((data)=>{
    if(data)
    {
      const isAvailtime = {
        status:200,
        message:"Booked Timeslot under Doctor",
        data:data
      }
      res.json(isAvailtime);
    }
    else{
      const isNotaviltime = {
        status:422,
        failure:"Booked Timeslot Not available under doctor"
      };
      res.json(isNotaviltime);
      errorlog.error("Error" + `${isNotaviltime.failure}` + "Statuscode:-" + `${isNotaviltime.status}`)
    }
  })
}))

//deletePatient details
app.delete('/deletePatient/:id/:rev',((req,res)=>{

  const deleteObject = {
    id:req.params.id,
    rev:req.params.rev
  }
  controller.deletePatient(deleteObject).then((data=>{
    console.log("Want to delete the records",data);
    res.status(200).send({
      message:"Patient data succeesfully Deleted"
    })
  }))

}))

//file upload into the server
app.post('/consulting',(req,res)=>{
  const requestBook = {
    patientid:req.body.patientid,
    patientname:req.body.patientname,
    email:req.body.email,
    appointmentstatus:req.body.appointmentstatus,
    symptoms:req.body.Symptoms,
    type:"patient-request"
  }
  patientParse.enquiryRequest(requestBook).then((data)=>{
    if(data)
    {
      res.status(200).send({
        message:"Patient Enquiry request is updated successfully"
      })
    }
  }).catch((err)=>{
    generatelogger.error("Pateint enquire process is rejected",err);
  })
})

//send a Doctor details to the client
app.get('/senddoctor/:id',(req,res)=>{
  console.log("Senddoctor",req.params.id);
  patientParse.getDoctor(req.params.id).then((data)=>{
    console.log("Collect data from server",data);
    if(data)
    {
      res.status(200).send({success:"Data fetched from a server",data:data});
    }
  }).catch((err)=>{
    generatelogger.error("doctor not available",err);
  })
})


//app server starts
app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
    generatelogger.info("serve is started with local server:"+ `http://localhost:${port}`)
  });