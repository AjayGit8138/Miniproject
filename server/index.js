
const connection = require('express');
const patientstruct = require('./model/structure');
const bodyparser = require('body-parser');
const patientlist = require('./services/servicelayer');
const app = connection();
const port = 8000;
const cors = require('cors');
const db = require('node-couchdb'); 

// const couch = new db({  
//   auth:{  
//   user: 'apikey-v2-qnl37sqy0oqwj8owtrhj6kam3p39wzmc0d46oflhvln',
//   password: 'cb14c8c9976ced0867c79d8eb625505a'  
//   }  
//   });  
//   couch.listDatabases().then(function(dbs){  
//   console.log(dbs);  
//   }); 


const { json } = require('body-parser');

app.use(connection.static('public'));
app.use(bodyparser.json());
app.use(cors({
    origin:'http://localhost:4200'}));

app.get('/totalpatients/:id',(req,res,value)=>{
    console.log(req.params.id);
   var listofpatients = patientlist.maintainpatientdata(req.params.id);
    res.json(listofpatients);
})



app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
  
    console.log(`server is listening on http://localhost:${port}`);
  });