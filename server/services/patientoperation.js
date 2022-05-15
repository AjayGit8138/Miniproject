const storedb = require('../db/nanodb');

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
var bookappointment = async (updateparams)=>{
    var returnstatus = new Promise((resolve,reject)=>{
        if(updateparams === undefined)
        {
            reject();
        }
        else{
            resolve(
                
            )
        }
    })
}
module.exports = {getbookrequest};