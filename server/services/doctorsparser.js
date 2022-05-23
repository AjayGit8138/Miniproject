const doctorschema = require('../model/doctorprofile');
const storedb = require('../db/nanodb');
var validator = require("email-validator");
var profile = {};
const generatelog = require('../logger/logger');

var checkdoctorauth = async (searchadmin)=>{

    var mailcheck =  validator.validate(searchadmin);
        console.log("Yes this is a Email",mailcheck);
        if(mailcheck)
        {
            var emailquery = {
                selector:{
                    "email":searchadmin,
                    "category":"Doctor"
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
       
      var value =   storedb.hospitaldb.get(searchadmin).then(data=>{
            console.log("found data",data);
            return data;
        }).catch((err=>{
            console.log("some bad request error",err);
        }))
    }
}
    return value;
}

//Get all doctors working in Hospital

var getalldoctors = async (getdata)=>{
    var getlist = new Promise((resolve,reject)=>{
        if(getdata === undefined)
        {
            reject();
        }
        else{
            resolve(
                storedb.hospitaldb.find(getdata).then((data)=>{
                    console.log("All doctor list ",data);
                    return data;
                }).catch((err)=>{
                    console.log("something Bad request Occur",err);
                })
            )
        }
    })
    return getlist;
}

//store doctor profile into database
var storedoctorinformation = async (storeobject)=>{
    var stored = new Promise((resolve,reject)=>{
        if(storeobject === undefined)
        {
            reject();
        }
        else{
            
            resolve(
               profile = ({
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
                    category:"Doctor"
               }),
               storedb.hospitaldb.insert(profile,profile.certificateid).then((data)=>{
                   console.log("Doctor Profile datas are Inserted successfully",data);
                   return data;
               }).catch((err)=>{
                   console.log("Bad response while inserting::"+err);
               })

            )
  
        }
    })
    return stored;
}

// var gettablets = async (tabletparams)=>{
//     var retlist = await new Promise((resolve,reject)=>{
//         if(tabletparams == undefined)
//         {
//             reject();
//         }
//         else{
//             resolve(
//                 storedb.hospitaldb.find().then((data)=>{
//                     console.log("Get all tablets from database",data);
//                 })
//             )
//         }
//     })
// }

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
    storedoctorinformation,checkdoctorauth,getalldoctors,gettabletlist,storetestreport
}