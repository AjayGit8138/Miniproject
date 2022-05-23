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
const session = require('express-session');
const Expression = require('couchdb-expression')(session);
const cookieParser = require('cookie-parser');
const { stream } = require('./logger/logger');
var CloudantStore = require('connect-cloudant-store')(session);

var store = new CloudantStore(
  {
      url : "https://apikey-v2-qnl37sqy0oqwj8owtrhj6kam3p39wzmc0d46oflhvln:cb14c8c9976ced0867c79d8eb625505a@a1b21745-8512-41b2-8506-c83a13a27993-bluemix.cloudant.com"
  }
);
//includes imports ends

store.on('hospital_admission',(stream=>{
  console.log("connedted",stream);
}))


app.use(connection.static('public'));
app.use(bodyparser.json());
// app.use(cors({
//     origin:'http://localhost:4200'}));

    app.use(cors({origin: [
      "http://localhost:4200"
    ], credentials: true}));

//set session and cookies for user
app.use(cookieParser());



app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: true
}));



//session end



app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});

app.get('/totalpatients/:id/:refid',(req,res,value)=>{
    console.log("Request sent By Treatment Category"+req.params.id);
    console.log(req.params.refid);
    var fetchdata ={
      "selector": {
         "Treatmentcategory": req.params.refid,
         "doctor": req.params.id
      }
   }
    
    patienparse.availability(fetchdata).then((data)=>{
      console.log("Get Patient datas from database",data);
      res.json(data);
    }).catch((err)=>{
      console.log("Whoo Patient is not available",err);
      generatelogger.error("Requested Patient is not available",err);
    })
})

app.post('/storepatient',(req,res,next)=>{
    var storeobject = {
      patientname:req.body.patientname,
      age:req.body.age,
      dateofbirth:req.body.dateofbirth,
      mobileno:req.body.mobileno,
      email:req.body.email,
      esino:req.body.esino,
      aadharno:req.body.aadharno,
      Treatmentcategory:req.body.Treatmentcategory,
      requestId:req.body.requestId,
      category:req.body.category,
      password:req.body.password,
      cpassword:req.body.cpassword,
      symptoms:req.body.symptoms,
      appointmentstatus:"NO",
      requestdate:new Date()
    }
    console.log("from form",storeobject);
    dbconnect.newpatinetrecord(storeobject).then((data=>{
      console.log("Patient data is successfully stored into the database");
      generatelogger.info("Patient data is successfully uploaded into the database server",data);
    })).catch((err=>{
      console.log("Some bad request Patient data is not uploaded into the database");
      generatelogger.info("Some bad request Patient data is not uploaded into the database");
    }))
})

app.get('/checkpatientlogin/:objectid',isLoggedIn,(req,res,next)=>{
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

app.post('/savedoctorprofile',(req,res,next)=>{
        doctorfile.storedoctorinformation(req).then((success=>{
          console.log("Hi Doctor information stored into the server",success);
          generatelogger.info("Hi Doctor Profile is uploaded into the server");
        })).catch((err=>{
          console.log("Some Bad updation Doctor profile is not uploaded into the server",err);
        }))
})

app.get('/bookrequested',(req,res,next)=>{
  var data = {
    selector:{
        "category":"patient",
        "appointmentstatus":"NO"
    }
}
      patienparse.getbookrequest(data).then((data)=>{
        console.log("waiting for book details",data);
        res.json(data);
      })
})

app.get('/doctorloginauth/:objectid',(req,res,next)=>{
  req.session = req.params.objectid;
  console.log("session address",req.session);

  doctorfile.checkdoctorauth(req.params.objectid).then((data)=>{
    console.log("doctor Login auth ",data);
      
      res.json(data);
  })
})

app.get('/getdoctordetails/:id',(req,res,next)=>{
  var data;
  if(req.params.id == 'Doctor')
  {
  data = {
    selector:{
        "category":req.params.id,
    }
    }
  }
  else{
    data = {
      selector:{
        "category":"Doctor",
        "specialist":req.params.id
      }
    }
  }
  if(data)
  {
    doctorfile.getalldoctors(data).then((data)=>{
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
      doctorassign:req.body.assigndoctor,
      appointmentstatus:req.body.appointstatus,
      timingforappointment:req.body.timingforappointment,
      dateofappointment:req.body.dateofappointment
    }
    console.log("update operation in to database",patientid);
    console.log("want to store a object",updatepatient);
  var retmessage = patienparse.bookappointment(updatepatient,patientid).then((resdata)=>{
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
          patientId:req.body.patientId,
          patientname:req.body.patientname,
          precuations:req.body.precuations,
          remedies:req.body.remedies,
          reportby:req.body.reportby,
          tablets:req.body.tabletscategory,
          totalreport:req.body.totalreport
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
app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
    generatelogger.info("serve is started with local server:"+ `http://localhost:${port}`)
  });