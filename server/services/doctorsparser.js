const doctorschema = require('../model/doctorprofile');
const storedb = require('../db/nanodb');
var profile = {};

var checkdoctorauth = async (searchadmin)=>{
    console.log("from doctorauthentication",searchadmin);
    if(searchadmin)
    {
       
      var value =   storedb.hospitaldb.get(searchadmin).then(data=>{
            console.log("found data",data);
        
           
            return data;
        }).catch((err=>{
            console.log("some bad request error",err);
        }))
    }
    return value;
}
var storedoctorinformation = async (storeobject)=>{
    var stored = new Promise((resolve,request)=>{
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
               }).catch((err)=>{
                   console.log("Bad response while inserting::"+err);
               })

            )
  
        }
    })
}

module.exports = {
    storedoctorinformation,checkdoctorauth
}