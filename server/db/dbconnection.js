const Cloudant = require('@cloudant/cloudant');
const { request } = require('express');
var retval;

var data = {
    name:"*****************",
    lastname:"**************"
}

var url = 'https://a1b21745-8512-41b2-8506-c83a13a27993-bluemix.cloudantnosqldb.appdomain.cloud' ;
var username = 'apikey-v2-qnl37sqy0oqwj8owtrhj6kam3p39wzmc0d46oflhvln';
var password = 'cb14c8c9976ced0867c79d8eb625505a';

var cloudant = Cloudant({ url: url, username: username, password: password });
var db = cloudant.db.use('hospital_admission');

var id = "1-57c3fef75d9806516620b0a6b89e82ba"; //maintain patient dform record
module.exports.insertpatient =  function(patientobject)
{
    return new Promise((resolve,reject)=>{
        if(patientobject === undefined)
        {
            reject();
        }
        else{
                cloudant.use('hospital_admission').insert(patientobject).then((data) => {
                console.log("Data Inserted into Clouddatabase"+data); 
              }).catch((err) => {
              console.log(err);
            });
        }
    })
}


module.exports.getlist = function(paramsvalue)
{
    
    console.log(paramsvalue);
    db.get(id).then((data) => {
        console.log("from dbcon",data); 
        
        for(var x in data.patientlist)
        {
            console.log(x);
            if(data.patientlist[x].category === paramsvalue)
            {
               retval =  data.patientlist[x].noofpatients = data.patientlist[x].noofpatients+1;
              
            }
        }
        console.log(retval); 
        
                       
                      }).catch((err) => {
                      console.log(err);
                    });
                    console.log(retval);
                    return JSON.stringify(retval);
}
function documentgetdata(getobject)
{
    var search = "skin9898";
    db.view('fetchpatientdata',function(err,res){
        res.forEach(function(row){
            console.log("findval",row.value == "skin9898")
        })
    })
    db.get(id).then((data) => {
        
        // // db.changes({"name":"*******"}).then((data)=>{
        // //     console.log("updates succesfully");
        // })
        
        console.log("Inserted successfully");
       
        console.log("Patient Form Presented in this database",JSON.stringify(data)); 
      }).catch((err) => {
      console.log(err);
    });
}
documentgetdata(data);