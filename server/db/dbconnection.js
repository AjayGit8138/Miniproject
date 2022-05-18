const DbHospital = require('./nanodb');
var validator = require("email-validator");

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
        var value;
    // {selector:{"requestId":"skin9898"}}
    console.log(getobject);
        var mailcheck =  validator.validate(getobject);
        console.log("Yes this is a Email",mailcheck);
        if(mailcheck)
        {
            var emailquery = {
                selector:{
                    "email":getobject,
                    "category":"patient"
                }
            }
            value = DbHospital.hospitaldb.find(emailquery).then((data)=>{
                console.log("email id matched documents fetched from database",data);
                return data;
            }).catch((err)=>{
                console.log("EmailId doesn't Exists in database",err);
            })
            
        }
        else{
        if(getobject)
        {
          value =   DbHospital.hospitaldb.get(getobject).then(data=>{
                console.log("found data",data);
                return data;
            }).catch((err=>{
                console.log("some bad request error",err);
            }))
        }
    }
    return value;
    };

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

function isEmailvalid(inputemail)
{
    var pattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    return pattern.test(inputemail);
}


module.exports = {newpatinetrecord,getlogindetails}