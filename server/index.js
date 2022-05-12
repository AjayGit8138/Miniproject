
const connection = require('express');

const bodyparser = require('body-parser');
const patientlist = require('./services/servicelayer');
const app = connection();
const port = 8000;
const cors = require('cors');
const dbconnect = require('./db/dbconnection');


app.use(connection.static('public'));
app.use(bodyparser.json());
app.use(cors({
    origin:'http://localhost:4200'}));

app.get('/totalpatients/:id',(req,res,value)=>{
    console.log("Request sent By Treatment Category"+req.params.id);
  //  var listofpatients = patientlist.maintainpatientdata(req.params.id);
 var listofpatients = dbconnect.getlist(req.params.id);
 
 console.log("from Index",+listofpatients);
    res.json(listofpatients);
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
      password:req.body.password,
      cpassword:req.body.cpassword,
      symptoms:req.body.symptoms
    }

    dbconnect.insertpatient(storeobject);
})


app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
  });