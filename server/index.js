//includes imports
const connection = require('express');
const bodyparser = require('body-parser');
const patientlist = require('./services/patientoperation');
const app = connection();
const port = 8000;
const cors = require('cors');
const dbconnect = require('./db/dbconnection');
const doctorfile = require('./services/doctorsparser');
const patienparse = require('./services/patientoperation');
const generatelogger = require('./logger/logger');
const controller = require('./controller/doctorcontroller');
const errorlog = require('./logger/errorlog');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const {schema,adminauth,reportvalidation,urinetestreport,countreport} = require('./validatior');
const {schemadoctor} = require('./doctorvalidator')
app.use(connection.static('public'));
app.use(bodyparser.json());

//cors implementation
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));


app.get('/admittedpatients', function(_req, res){
      patienparse.admitted().then((data)=>{
        if(data)
        {
          res.status(200).send({
            data:data,
            message:"Admitted Patients Details fetched From database"
          })
        }
      }).catch((err)=>{
        generatelogger.error("can't fetch admittedpatients details from the server" + err);
      })
});

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
const upload = multer({storage:storage});


app.post('/upload', upload.single("file"), (req, res) => {
 

  const file = req.file;
  console.log("filenames",file);
  if(file)
  {
    res.json({"message":"upload successfully"});
  }
 
});

app.get('/totalpatients/:id/:refid',(req,res)=>{
    console.log("Request sent By Treatment Category"+req.params.id);
    console.log(req.params.refid);
    const fetchdata ={
      "selector": {
         "treatmentcategory": req.params.refid,
         "doctor": req.params.id,
         "type":"patient-request"
      }
   }
    
    controller.fetchpatients(fetchdata).then((data)=>{
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
app.post('/storepatient',(req,res)=>{
  console.log("validation");
  
  const { error } = schema.validate(req.body)
  console.log("validation",error);
    if(error === undefined)
    {
    const storeobject = {
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
    console.log("from form",storeobject);
    controller.storepatientdata(storeobject).then((data)=>{
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
app.get('/checkpatientlogin/:objectid',(req,res)=>{
  console.log(req.params.objectid);
  dbconnect.getlogindetails(req.params.objectid).then((data)=>{
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
app.get('/gettablets/:id',(req,res)=>{
     console.log("Tabletslist");
     console.log("-----",req.params.id);
            controller.pharmacy(req.params.id).then((data)=>{
            console.log("Successfully data received from server",data);
            generatelogger.info("Files transfer from server");
            console.log("From Indexjs output",data);
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
app.post('/savedoctorprofile',(req,res)=>{
          const {error} = schemadoctor.validate(req.body);
          if(error == undefined)
          {
        controller.storedoctordetails(req).then((success=>{

          console.log("Hi Doctor information stored into the server",success);
          if(success)
          {
            res.status(201).send({
              message:"Doctor Profile is successfully Stored into the database"
            })
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

app.get('/bookrequested',(_req,res)=>{
  const book = {
    selector:{
        "type":"patient-request",
        "appointmentstatus":"NO"
    }
}
      controller.bookingstat(book).then((data)=>{
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

app.get('/doctorloginauth/:objectid',(req,res)=>{
 
  console.log("session address",req.params.objectid);

  controller.checkdoctorlogin(req.params.objectid).then((data)=>{
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
  controller.admincheck(req.body.loginid).then((data)=>{
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

app.get('/getdoctordetails/:id',(req,res)=>{
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
    controller.docslist(doctorSearch).then((data)=>{
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

app.put('/updatepatienrecord/:updateobject',(req,res)=>{
    const patientid = req.params.updateobject;
    console.log("******",patientid);
    const updatepatient = {
      tokenname:req.body.Tokenname,
      doctorid:req.body.docid,
      treatmentcategory:req.body.Treatmentcategory,
      doctorassign:req.body.assigndoctor,
      appointmentstatus:req.body.appointstatus,
      timingforappointment:req.body.timingforappointment,
      dateofappointment:req.body.dateofappointment
    }
    console.log("update operation in to database",patientid);
    console.log("want to store a object",updatepatient);
  const retmessage = controller.waitingforbook(updatepatient,patientid).then((resdata)=>{
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
//generate medical report
app.post('/generatemedicalreport',(req,res)=>{
        const {error} = reportvalidation.validate(req.body);
        console.log("Report validation",error);
        if(error)
        {
          const medicalstatus = {
              status:422,
              message:"Data Is Not Valid"
          }
          console.log("validation error",medicalstatus);
        }
        else{
        const object = {
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
          docid:req.body.docid,
          dateofreport:new Date()
                } 
            console.log("Save testReport",object);
            controller.reportgeneration(object).then((data)=>{
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

app.post('/bloodreport',(req,res)=>{
 
  const {error} = urinetestreport.validate(req.body);
    if(error)
    {
      const medicalvalidate = {
        status:422,
        message:"Data not found"
      }
      console.log("Error validation",error);
      errorlog.error("Error" + `${medicalvalidate.message}` + "statuscode:-" + `${medicalvalidate.status}`);
    }
    else{
  const object = {
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
      console.log("Save testReport",object);
      controller.reportgeneration(object).then((data)=>{
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
app.post('/bloodcountreport',(req,res)=>{
  console.log("*****");
  const {error } = countreport.validate(req.body);

  if(error)
  {
    const reportstatus = {
      status:422,
      message:"Data Not found"
    }
    res.status(422).send({message:"Invalid you entered data error"});
    console.log("Error",error);
    errorlog.error("Error:-" + `${reportstatus.message}` + "Statuscode:-" + `${reportstatus.status}` + `${reportstatus}`)
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
      controller.reportgeneration(object).then((data)=>{
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

app.post('/download',(req,res)=>{
  console.log("filename",req.body.filename);

  const filepath = path.join(__dirname,'./uploads/')  + req.body.filename;
  console.log("filepath",filepath);
  res.sendFile(filepath);
})
app.get('/getreport/:id',(req,res)=>{
     console.log("Get  testReport",req.params.id);
            controller.getreport(req.params.id).then((data)=>{
            console.log("Successfully data received from server",data);
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

app.delete('/deletepatient/:id/:rev',((req,res)=>{
  console.log("Delete patient record",req.params.id);
  console.log("Delete patient record",req.params.rev);
  const deleteobject = {
    id:req.params.id,
    rev:req.params.rev
  }
  controller.deletepatient(deleteobject).then((data=>{
    console.log("Want to delete the records",data);
    res.status(200).send({
      message:"Patient data succeesfully Deleted"
    })
  }))

}))

//file upload
app.post('/consulting',(req,res)=>{
  const requestBook = {
    patientid:req.body.patientid,
    patientname:req.body.patientname,
    email:req.body.email,
    appointmentstatus:req.body.appointmentstatus,
    symptoms:req.body.Symptoms,
    type:"patient-request"
  }
  patienparse.enquiryrequest(requestBook).then((data)=>{
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
app.get('/senddoctor/:id',(req,res)=>{
  console.log("senddoctor",req.params.id);
  patienparse.getdoctor(req.params.id).then((data)=>{
    console.log("Collect data from server",data);
    res.json(data);
  }).catch((err)=>{
    generatelogger.error("doctor not available",err);
  })
})

app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
    generatelogger.info("serve is started with local server:"+ `http://localhost:${port}`)
  });