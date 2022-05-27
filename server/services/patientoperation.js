const storedb = require('../db/nanodb');
const tomail = require('../sendmail');
const generatelog = require('../logger/logger');


//implemented using promise handling
var getbookrequest = (bookingrequest)=>{
    return new Promise((resolve,reject)=>{
        if(bookingrequest === undefined)
        {
            reject();
        }
        else{
            
            var bookStatus =   storedb.hospitaldb.find(bookingrequest).then((data)=>{
                    console.log("total patient details fetched from database",data);
                    return data;
                }).catch((err)=>{
                    console.log("Bad request",err);
                    generatelog.error("Admission Booking request failed due to the server");
                })
            return resolve(bookStatus);
        }
    })
   
}

//update booking details
var bookappointment = (updateparams,referenceid)=>{
     var bool = 1;
    return new Promise((resolve,reject)=>{
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
                                          generatelog.error("Mail not sent properly to the patient some bad request occurs");
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
           return resolve(bookstats);
        }
    })
    
}

//implemented using promise 
var availability = (getparams)=>{
    return new Promise((resolve,reject)=>{
        if(getparams == undefined)
        {
            reject();
        }
        else{
           
           var retval = storedb.hospitaldb.find(getparams).then((data)=>{
                   console.log("Data successfully get from server",data);
                   generatelog.info("Patient data is successfully fetched from server");
                   return data;
               }).catch((err)=>{
                   console.log("Can't able to fetch a data from server",err);
                   generatelog.error("can't able to fetch a data from server");
               })
               return resolve(retval);
           
        }
    })
 
}

//gettestreport from database
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
//Patient record deletion process
 var patientdelete = (object)=>{
     console.log("delete from patientoperation",object);
     return new Promise((resolve,reject)=>{
        if(object == undefined){
            return reject(object);
       }
       else{
          var delval =  storedb.hospitaldb.get(object.id,function(err,doc){
               console.log("want to delete a data from database",doc);
               if(doc)
               {
                   storedb.hospitaldb.destroy(object.id,object.rev,function(err,body){
                       if(!err)
                       {
                           console.log("Deleted successfully");
                       }
                       else{
                           console.log("Not deleted successfully");
                       }
                   })
               }
           })
          return resolve(delval);
       }
     })
 }

 //insert new Patient record into the database
 var newpatinetrecord = (patientobject)=>{
    return new Promise((resolve,reject)=>{
        if(patientobject === undefined)
        {
            reject();
        }
        else{
              var storedata =   storedb.hospitaldb.insert(patientobject).then((data) => {
                console.log("Data Inserted into Clouddatabase",data); 
                generatelog.info("Patient Record is Inserted successfully Into the server");
                return data;
              }).catch((err) => {
              console.log("Can't able to Insert the patient record into the database");
              generatelog.error("Can't able to Insert the patient record into the database");
            });
            return resolve(storedata);
        }
    })
  
}
module.exports = {getbookrequest,bookappointment,availability,gettestreport,patientdelete,newpatinetrecord};