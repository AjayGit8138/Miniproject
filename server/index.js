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
const cookieParser = require('cookie-parser');


var fs = require('fs');
const multer = require('multer');
const logger = require('./logger/logger');
const path = require('path');


app.use(connection.static('public'));
app.use(bodyparser.json());


    app.use(cors({origin: [
      "http://localhost:4200"
    ], credentials: true}));
app.use(cookieParser());
app.get('/admittedpatients', function(req, res){
      patienparse.admitted().then((data)=>{
        if(data)
        {
          res.json(data);
        }
      }).catch((err)=>{
        generatelogger.error("can't fetch the details from the server");
      })
});

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads");
  },
  filename:function(req,file,cb){
    originalname = file.originalname;
    console.log("orginal name",originalname);
    cb(null,originalname);
    console.log("orginal name",originalname);
  }
})
const upload = multer({storage:storage});


app.post('/upload', upload.single("file"), (req, res) => {
 

  var file = req.file;
  console.log("filenames",file);
  if(file)
  {
    res.json({"message":"upload successfully"});
  }
 
});

app.get('/totalpatients/:id/:refid',(req,res,value)=>{
    console.log("Request sent By Treatment Category"+req.params.id);
    console.log(req.params.refid);
    var fetchdata ={
      "selector": {
         "treatmentcategory": req.params.refid,
         "doctor": req.params.id,
         "type":"patient-request"
      }
   }
    
    controller.fetchpatients(fetchdata).then((data)=>{
      console.log("Get Patient datas from database",data);
      generatelogger.info("successfully get Patient details from database");
      res.json(data);
    }).catch((err)=>{
      console.log("Whoo Patient is not available",err);
      generatelogger.error("Requested Patient is not available",err);
    })
})
//store Patient data into the database
app.post('/storepatient',(req,res,next)=>{
    var storeobject = {
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
        res.status(200).send({
          message:"Patient data is successfully generated"
        })
    }).catch((err)=>{
      console.log("Err cant to add into database",err);
      generatelogger.error("Patient data is not stored into the database");
    })
   
})
//checklogin authentication for patient
app.get('/checkpatientlogin/:objectid',(req,res,next)=>{
  console.log(req.params.objectid);
  dbconnect.getlogindetails(req.params.objectid).then((data)=>{
      console.log("from router ",data);
      res.json(data);
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
              res.status(400).send({
                message: 'Cant Fetch from database is an error!'
             });
              else
                res.json(data);
          
          }).catch((err)=>{
            console.log("Error from server",err);
            res.send("Server Down Cant fetch Details");
          })
})
//save doctor Profile into the server
app.post('/savedoctorprofile',(req,res,next)=>{
        controller.storedoctordetails(req).then((success=>{
          console.log("Hi Doctor information stored into the server",success);
          if(success)
          {
            res.status(200).send({
              message:"Doctor Profile is successfully Stored into the database"
            })
          }
        })).catch((err=>{
          console.log("Some Bad updation Doctor profile is not uploaded into the server",err);
        }))
})

app.get('/bookrequested',(req,res,next)=>{
  var data = {
    selector:{
        "type":"patient-request",
        "appointmentstatus":"NO"
    }
}
      controller.bookingstat(data).then((data)=>{
        console.log("waiting for book details",data);
        if(data)
        {
        res.json(data);
        }
      }).catch((err)=>{
          console.log("Get Booking status error",err);
          generatelogger.error("Can't get a details from ther server");
      })
})

app.get('/doctorloginauth/:objectid',(req,res,next)=>{
 req.session = req.params.objectid;
  console.log("session address",req.session);

  controller.checkdoctorlogin(req.params.objectid).then((data)=>{
    console.log("Successfully data received from server",data);
    generatelogger.info("Doctor auth proceess is done");
    if(data){
      res.json(data);
    }
}).catch((err)=>{
  console.log("Error from server",err);
  res.send("Server Down Cant fetch Details");
})
})

//get admin priveliages
app.get('/admin/:id',(req,res)=>{
  console.log(req.params.id);
  controller.admincheck(req.params.id).then((data)=>{
    res.json(data);
  })
})

app.get('/getdoctordetails/:id',(req,res,next)=>{
  var data;
  if(req.params.id == 'Doctor')
  {
  data = {
    selector:{
        "type":req.params.id,
    }
    }
  }
  else{
    data = {
      selector:{
        "type":"Doctor",
        "specialist":req.params.id
      }
    }
  }
  if(data)
  {
    controller.docslist(data).then((data)=>{
      console.log("Doctors available in Hospital",data);
      res.json(data);
    }).catch((err)=>{
      console.log("Some Bad request Error occured",err);
      res.send("Error server down");
    })
  }
})

app.put('/updatepatienrecord/:updateobject',(req,res,next)=>{
    var patientid = req.params.updateobject;
    console.log("******",patientid);
    var updatepatient = {
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
  var retmessage = controller.waitingforbook(updatepatient,patientid).then((resdata)=>{
      console.log("Updated Appointment Booking status successfully",resdata);

      //return response
      return resdata;
      generatelogger.info("Booking appointment with requeste patient",resdata)
    }).catch((err)=>{
      console.log("Something Bad request Can't update",err);
      generatelogger.error("Bad Request Can't updated The booking patient request");
    })

    //return response
    if(retmessage!=undefined)
      res.status(200).send({
        message:"Hi Admin Patient Data is successfull updated"
      })
})
//generate medical report
app.post('/generatemedicalreport',(req,res)=>{

        var object = {
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
          dateofreport:new Date()
                } 
            console.log("Save testReport",object);
            controller.reportgeneration(object).then((data)=>{
            console.log("Successfully data received from server",data);
            generatelogger.info("Testreport is successfully generated into server from indexjs");
            if(data){
              res.status(200).send({
                message:"Patient Record is successfully generated"
              })
            }
        }).catch((err)=>{
          console.log("Error from server",err);
          res.send("Server Down Cant fetch Details");
  })
})

app.post('/bloodreport',(req,res)=>{

  var object = {
      totalreport:req.body.totalreport,
      acetone:req.body.acetone,
      bloodsugarlevels:req.body.bloodsugarlevels,
      patientId:req.body.patientId,
      patientname:req.body.patientname,
      reportby:req.body.reportby,
      urinsugar:req.body.urinsugar,
      type:"test-report"
          } 
      console.log("Save testReport",object);
      controller.reportgeneration(object).then((data)=>{
      console.log("Successfully data received from server",data);
      generatelogger.info("Testreport is successfully generated into server from indexjs");
      if(data){
        res.status(200).send({
          message:"Patient Record is successfully generated"
        })
      }
  }).catch((err)=>{
    console.log("Error from server",err);
    res.send("Server Down Cant fetch Details");
})
})

//blood Count Report
app.post('/bloodcountreport',(req,res)=>{

  var object = {
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
      type:"test-report"
          } 
      console.log("Save testReport",object);
      controller.reportgeneration(object).then((data)=>{
      console.log("Successfully data received from server",data);
      generatelogger.info("Testreport is successfully generated into server from indexjs");
      if(data){
        res.status(200).send({
          message:"Patient Record is successfully generated"
        })
      }
  }).catch((err)=>{
    console.log("Error from server",err);
    res.send("Server Down Cant fetch Details");
})
})

app.post('/download',(req,res,next)=>{
  console.log("filename",req.body.filename);

  filepath = path.join(__dirname,'./uploads/')  + req.body.filename;
  console.log("filepath",filepath);
  res.sendFile(filepath);
})
app.get('/getreport/:id',(req,res)=>{
     console.log("Get  testReport",req.params.id);
            controller.getreport(req.params.id).then((data)=>{
            console.log("Successfully data received from server",data);
            generatelogger.info("Testreport is  transferred to client from server");
            if(data){
              res.json(data);
            }
        }).catch((err)=>{
          console.log("Error from server",err);
          res.send("Server Down Cant fetch Details");
  })

})

app.delete('/deletepatient/:id/:rev',((req,res)=>{
  console.log("Delete patient record",req.params.id);
  console.log("Delete patient record",req.params.rev);
  let deleteobject = {
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
  var requestBook = {
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
    generatelogger.error("Pateint enquire process is rejected");
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