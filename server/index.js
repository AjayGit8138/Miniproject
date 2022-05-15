
const connection = require('express');

const bodyparser = require('body-parser');
const patientlist = require('./services/patientoperation');
const app = connection();
const port = 8000;
const cors = require('cors');
const dbconnect = require('./db/dbconnection');
const doctorfile = require('./services/doctorsparser');
const patienparse = require('./services/patientoperation');

app.use(connection.static('public'));
app.use(bodyparser.json());
app.use(cors({
    origin:'http://localhost:4200'}));

app.get('/totalpatients/:id',(req,res,value)=>{
    console.log("Request sent By Treatment Category"+req.params.id);
 dbconnect.availability(req.params.id).then((data)=>{
    console.log("total count",data);
    res.json(data);
 });
 
 
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
    dbconnect.newpatinetrecord(storeobject);
})

app.get('/checkpatientlogin/:objectid',(req,res,next)=>{
  console.log(req.params.objectid);

  dbconnect.getlogindetails(req.params.objectid).then((data)=>{
      console.log("from router ",data);
      
      res.json(data);
  })
  
  
  
});

app.post('/savedoctorprofile',(req,res,next)=>{
        doctorfile.storedoctorinformation(req);
})

app.use('/bookrequested',(req,res,next)=>{
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
  doctorfile.checkdoctorauth(req.params.objectid).then((data)=>{
    console.log("doctor Login auth ",data);
      
      res.json(data);
  })
})

app.put('/updatepatienrecord/:updateobject',(req,res,next)=>{
    var patientid = req.params.updateobject;
    var updatepatient = {
      doctorassign:req.body.assigndoctor,
      appointmentstatus:req.body.appointstatus,
      timingforappointment:req.body.timingforappointment,
      dateofappointment:req.body.dateofappointment
    }
    console.log("update operation in to database",patientid);
    console.log("want to store a object",updatepatient);
    
})
app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
  });