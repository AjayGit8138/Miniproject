const storedb = require('../db/nanodb');
const tomail = require('../sendmail');
const generatelog = require('../logger/logger');
var getbookrequest = async (bookingrequest)=>{
    var returnobject  = new Promise((resolve,reject)=>{
        if(bookingrequest === undefined)
        {
            reject();
        }
        else{
            resolve(
                storedb.hospitaldb.find(bookingrequest).then((data)=>{
                    console.log("total patient details fetched from database",data);
                    return data;
                }).catch((err)=>{
                    console.log("Bad request",err);
                })
            )
        }
    })
    return returnobject;
}

//update booking details
var bookappointment = async (updateparams,referenceid)=>{
    var returnstatus = new Promise((resolve,reject)=>{
        if(updateparams === undefined || referenceid === undefined)
        {
            reject();
        }
        else{
            
            


         var bookstats =    storedb.hospitaldb.get(referenceid,function(err,doc){
                    var patientdata = [];
                    // var revision = doc._rev;
                    doc.appointmentstatus = updateparams.appointmentstatus;
                    doc.time = updateparams.timingforappointment;
                    doc.doctor = updateparams.doctorassign;
                    doc.dateofappointment = updateparams.dateofappointment;
                    console.log("patientdata",doc);
                   
                    patientdata.push(doc);
                    console.log("New updated patient data",patientdata.push(updateparams));
                    storedb.hospitaldb.insert(doc,referenceid,function(err,body){
                        if(!err)
                        {
                            console.log("Updated successfully");
                            if(1)
                             {
                                tomail.mail(doc.email,updateparams).then((data)=>{
                                         console.log("Mail Successfully sent",data);
                                      }).catch((err)=>{
                                 console.log("Mail Not sent successfully",err);
                             })
                            }
                           return "patient Appointment is Booked successfully";

                        }
                        else{
                            console.log(err);
                        }
                    })
                })
            resolve(bookstats);
        }
    })
    return "Appointmet status booked successfully";
}
var availability = async (getparams)=>{
    var getcount = new Promise((resolve,reject)=>{
        if(getparams == undefined)
        {
            reject();
        }
        else{
           resolve(
               storedb.hospitaldb.find(getparams).then((data)=>{
                   console.log("Data successfully get from server",data);
                   return data;
               })
           )
        }
    })
    return getcount;
}

var gettestreport = (getreference)=>{
    console.log("from services",getreference);
     return new Promise((resolve,reject)=>{
        if(getreference == undefined){
             return reject(getreference);
        }
        else{
           var query ={
             selector: {
                "totalreport": getreference
                }
           }
           var retval = storedb.hospitaldb.find(query).then((data)=>{
                console.log("Get patient test report from server",data);
                generatelog.info("Patient test report from server");
                return data;
            }).catch((err)=>{
                 console.log("Error Testreport is not available",err);
                 generatelog.info("Error Testreport is not available",err);
            })
          return resolve(retval);
        }
     
     })
 
 }

module.exports = {getbookrequest,bookappointment,availability,gettestreport};