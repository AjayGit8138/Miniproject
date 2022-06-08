const storedb = require('../db/nanodb');
const generatelog = require('../logger/logger');

const errorlog = require('../logger/errorlog');


//implemented using promise handling
const getbookRequest = (bookingrequest)=>{
    return new Promise((resolve,reject)=>{
        if(bookingrequest === undefined)
        {
            reject();
        }
        else{
            
             const bookStatus =   storedb.hospitaldb.find(bookingrequest).then((data)=>{
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
const bookAppointment = (updateparams,referenceid)=>{
    
    return new Promise((resolve,reject)=>{
        if(updateparams === undefined || referenceid === undefined)
        {
            reject();
        }
        else{
         const bookstats =    storedb.hospitaldb.get(referenceid,function(_err,doc){
                   
                    doc.appointmentstatus = updateparams.appointmentstatus;
                    doc.time = updateparams.timingforappointment;
                    doc.doctor = updateparams.doctorassign;
                    doc.dateofappointment = updateparams.dateofappointment;
                    doc.treatmentcategory = updateparams.treatmentcategory;
                    doc.tokenname = updateparams.tokenname;
                    doc.docid = updateparams.doctorid;
                    console.log("patientdata",doc);
                    storedb.hospitaldb.insert(doc,referenceid,function(err,_body){
                        if(!err)
                        {
                            console.log("Updated successfully");
                            

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
const availability = (getparams)=>{
    return new Promise((resolve,reject)=>{
        if(getparams == undefined)
        {
            reject();
        }
        else{
           
           const retval = storedb.hospitaldb.find(getparams).then((data)=>{
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
const enquiryRequest=(params)=>{
    return new Promise((resolve,reject)=>{
        if(params == undefined){
            reject();
        }
        else{
            const equiryDetail = storedb.hospitaldb.insert(params).then((data)=>{
                generatelog.info("Updation equiry Process is successfully generated");
                return data;
            }).catch((err)=>{
                generatelog.error("Can't update the enquiry process to your record",err);
            })
            return resolve(equiryDetail);
        }
    })
}

//gettestreport from database
const gettestReport = (getreference)=>{
    console.log("from services",getreference);
     return new Promise((resolve,reject)=>{
        if(getreference == undefined){
             return reject(getreference);
        }
        else{
           const query ={
             selector: {
                "totalreport": getreference
                }
           }
           const retval = storedb.hospitaldb.find(query).then((data)=>{
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
 const patientDelete = (deletepatient)=>{
     console.log("delete from patientoperation",deletepatient);
     return new Promise((resolve,reject)=>{
        if(deletepatient == undefined){
            return reject(deletepatient);
       }
       else{
          const delval =  storedb.hospitaldb.get(deletepatient.id,function(_err,doc){
               console.log("want to delete a data from database",doc);
               if(doc)
               {
                   storedb.hospitaldb.destroy(deletepatient.id,deletepatient.rev,function(error,_body){
                       if(!error)
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
 const newPatinetRecord = (patientobject)=>{
    return new Promise((resolve,reject)=>{
        if(patientobject === undefined)
        {
            reject();
        }
        else{
              const storedata =   storedb.hospitaldb.insert(patientobject).then((data) => {
                console.log("Data Inserted into Clouddatabase",data); 
                generatelog.info("Patient Record is Inserted successfully Into the server");
                return data;
              }).catch((err) => {
              console.log("Can't able to Insert the patient record into the database");
              generatelog.error("Can't able to Insert the patient record into the database",err);
            });
            return resolve(storedata);
        }
    })
  
}

const admitted = ()=>{
    const admittedcounts = {
        selector:{
            "appointmentstatus": "YES",
            "type":"patient-request"
        }
    }
    return new Promise((resolve,_reject)=>{
        const totalcount = storedb.hospitaldb.find(admittedcounts).then((data)=>{
            return data;
        }).catch((err)=>{
            generatelog.error("Cant fetch the records from the server",err);
        })
        return resolve(totalcount);
    })
}

const appointBook = (storebook)=>{
    return new Promise((resolve,reject)=>{
        if(storebook)
        {
            const directconsult = storedb.hospitaldb.insert(storebook).then((data)=>{
                console.log("Inserted data",data);
                return data;
            }).catch((error)=>{
                errorlog.error("Server down can't access the requested files into the server",error);
            })
            return resolve(directconsult);
        }
        else{
            reject();
        }
    })
}


const getDoctor = (patientref)=>{
    return new Promise((resolve,_reject)=>{
        const finddoctor = {
            selector:{
                "patientid":patientref,
                "appointmentstatus": "YES",
                "type":"patient-request"
            }
        }
        const getdatail = storedb.hospitaldb.find(finddoctor).then((data)=>{
            console.log("response details",data.docs.length);
            for(const element of data.docs)
            {
              return storedb.hospitaldb.get(element.docid).then((responsedata)=>{
                    console.log("Data items",responsedata);
                    return responsedata;
                }).catch((err)=>{
                    console.log("err",err);
                })
              
            }
           
        })
        return resolve(getdatail);
    }) 
}
module.exports = {appointBook,getDoctor,admitted,enquiryRequest,getbookRequest,bookAppointment,availability,gettestReport,patientDelete,newPatinetRecord};