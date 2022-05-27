const doctorschema = require('../model/doctorprofile');
const storedb = require('../db/nanodb');
var validator = require("email-validator");
var profile = {};
const generatelog = require('../logger/logger');



var adminlogin = (adminvalidataion)=>{
    return new Promise((resolve,reject)=>{
        if(adminvalidataion == undefined)
        {
            reject();
        }
        else{
            var adminquery = {
                selector:{
                    "type":"Admin"
                }
            }
            var isAdminAvail = storedb.hospitaldb.find(adminquery).then((data)=>{
                return data;
            }).catch((err)=>{
                generatelog.error("Not available");
            })
        }
        return resolve(isAdminAvail);
    })
}

//implemented using promise

 var checkdoctorauth = (searchadmin)=>{

    var mailcheck =  validator.validate(searchadmin);
        console.log("Yes this is a Email",mailcheck);
        return new Promise((resolve,reject)=>{
            if(mailcheck)
            {
                var emailquery = {
                    selector:{
                        "email":searchadmin,
                        "type":"Doctor"
                    }
                }
                value =storedb.hospitaldb.find(emailquery).then((data)=>{
                    console.log("email id matched documents fetched from database",data);
                    return data;
                }).catch((err)=>{
                    console.log("EmailId doesn't Exists in database",err);
                })
            }
            else{
        if(searchadmin)
        {
            console.log("searchadmin",searchadmin);
            var searchbyid = {
                selector:{
                    "certificateid":searchadmin,
                    "type":"Doctor"
                }
            }
           
          var value =   storedb.hospitaldb.find(searchbyid).then(data=>{
                console.log("found data",data);
                return data;
            }).catch((err=>{
                console.log("some bad request error",err);
            }))
        }
    }
        return resolve(value);

        })

}

//Get all doctors working in Hospital
//implemented using Promise
var getalldoctors = (getdata)=>{
    return new Promise((resolve,reject)=>{
        if(getdata === undefined)
        {
            reject();
        }
        else{
            
            var getdoclist =  storedb.hospitaldb.find(getdata).then((data)=>{
                    console.log("All doctor list ",data);
                    return data;
                }).catch((err)=>{
                    console.log("something Bad request Occur",err);
                    generatelog.error("Something Bad requese while Fetching from server");
                })
            return resolve(getdoclist);
        }
    })
}
// implementation ends


//store doctor profile into database
//implemented using promise 
var storedoctorinformation = async (storeobject)=>{
    return new Promise((resolve,reject)=>{
        if(storeobject === undefined)
        {
            reject();
        }
        else{
            
            
               profile = {
                    doctorname:storeobject.body.doctorname,
                    email:storeobject.body.email,
                    mobileno:storeobject.body.mobileno,
                    gender:storeobject.body.gender,
                    dateofbirth:storeobject.body.dateofbirth,
                    profilesnap:storeobject.body.profilesnap,
                    certificateid:storeobject.body.certificateid,
                    specialist:storeobject.body.specialist,
                    education:storeobject.body.specialistdeg,
                    password:storeobject.body.password,
                    cpassword:storeobject.body.cpassword,
                    type:"Doctor"
               }

              var retval =  storedb.hospitaldb.insert(profile).then((data)=>{
                   console.log("Doctor Profile datas are Inserted successfully",data);
                   generatelog.info("Doctor Profile is Generated successfully");
                   return data;
               }).catch((err)=>{
                   console.log("Bad response while inserting::"+err);
                   generatelog.error("Some Bad Response Occur while storing information");
               })

            return resolve(retval);
  
        }
    })
    
}
var gettabletlist = (getreference)=>{
   console.log("from services",getreference);
    return new Promise((resolve,reject)=>{
       if(getreference == undefined){
            return reject(getreference);
       }
       else{
          var query ={
            selector: {
               "category": getreference
               }
          }
          var retval = storedb.hospitaldb.find(query).then((data)=>{
               console.log("Get medicine tablet from server",data);
               generatelog.info("Get medicine tablet from server");
               return data;
           }).catch((err)=>{
                console.log("Error from Medicine list",err);
                generatelog.info("Error from Medicine list",err);
           })
         return resolve(retval);
       }
    
    })

}

var storetestreport = (reportobject)=>{
    console.log("from services",reportobject);
    return new Promise((resolve,reject)=>{
        if(reportobject == undefined)
        {
           return reject(reportobject);
        }
        else{
            let retobject =  storedb.hospitaldb.insert(reportobject).then((data)=>{
                console.log("Doctor Profile datas are Inserted successfully",data);
                return data;
            }).catch((err)=>{
                console.log("Bad response while inserting::"+err);
                return err;
            })
           return resolve(retobject);
        }
    })
}
module.exports = {
    storedoctorinformation,checkdoctorauth,getalldoctors,gettabletlist,storetestreport,adminlogin
}