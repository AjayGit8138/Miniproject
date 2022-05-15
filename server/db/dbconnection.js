const DbHospital = require('./nanodb');

var totalPalist = "16edf8804196a7dbbf6f4b5529c2fe03"; //get total patient list

const { request } = require('express');
var retval;

var data = {
    selector:{
        "requestId":"skin9898"
    }
}
var patiendic = {
    selector:{
        "category":"skin",
        "noofpatients":""
    }
}
let globalreturn = [];
var searchval = [];
searchval.push(data);
console.log("storeddata",searchval[0]);


var getlogindetails = 
    async (getobject)=>{
        let pushval = [];
    // {selector:{"requestId":"skin9898"}}
    console.log(getobject);
        
        if(getobject)
        {
           
          var value =   DbHospital.hospitaldb.get(getobject).then(data=>{
                console.log("found data",data);
            
               
                return data;
            }).catch((err=>{
                console.log("some bad request error",err);
            }))
        }
        return value;
    };


var availability = async (getparams)=>{
    var getcount = new Promise((resolve,reject)=>{
        if(getparams == undefined)
        {
            reject();
        }
        else{
            resolve(
            DbHospital.hospitaldb.get(totalPalist).then((data)=>{
                console.log("Total admitted patients",data);
                for(var x in data.patientlist)
                {
                    console.log(getparams);
                    if(data.patientlist[x].category === getparams)
                    {
                       retval =  data.patientlist[x].noofpatients = data.patientlist[x].noofpatients+1;
                       
                    }
                }
                console.log(retval);
                DbHospital.hospitaldb.insert(totalPalist,patiendic).then((data)=>{
                    console.log("updates");
                })
              return retval;
             
            }).catch((err)=>{
                return "Data Not available";
            }))
            
        }
    })
    
    return getcount;
}

var newpatinetrecord = async (patientobject)=>{
    var insertrecord = new Promise((resolve,reject)=>{
        if(patientobject === undefined)
        {
            reject();
        }
        else{
                DbHospital.hospitaldb.insert(patientobject,patientobject.requestId).then((data) => {
                console.log("Data Inserted into Clouddatabase"+data); 
              }).catch((err) => {
              console.log(err);
            });
        }
    })
    return insertrecord;
}




module.exports = {availability,newpatinetrecord,getlogindetails}