const DbHospital = require('./nanodb');
const validator = require("email-validator");
const generatelogger = require('../logger/logger');

var getlogindetails = 
    async (getobject)=>{
      
    let value;
    // {selector:{"requestId":"skin9898"}}
    console.log(getobject);
        const mailcheck =  validator.validate(getobject);
        console.log("Yes this is a Email",mailcheck);
        if(mailcheck)
        {
            const emailquery ={
                "selector": {
                   "type": "Patient"
                }
             }
            value = DbHospital.hospitaldb.find(emailquery).then((data)=>{
                console.log("email id matched documents fetched from database",data);
                generatelogger.info("Emailid exists while entering the form",getobject);
                return data;
               
            }).catch((err)=>{
                console.log("EmailId doesn't Exists in database",err);
                generatelogger.info("EmailId doesn't exists",getobject);
            })
            
        }
        else{
        if(getobject)
        {
            const loginauth ={
                "selector": {
                   "requestId": getobject
                }
             }
          value =   DbHospital.hospitaldb.find(loginauth).then(data=>{
                console.log("found data",data);
                generatelogger.info("Requested Details Found")
                return data;
            }).catch((err=>{
                console.log("some bad request error",err);
                generatelogger.error("Some bad reques error",err);
            }))
        }
    }
    return value;
    };



module.exports = {getlogindetails}