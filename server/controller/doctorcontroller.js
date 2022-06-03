const {gettabletlist,storetestreport,checkdoctorauth, getalldoctors,storedoctorinformation, adminlogin} = require('../services/doctorsparser');
const {gettestreport,patientdelete,newpatinetrecord,availability,getbookrequest,bookappointment} = require('../services/patientoperation');
const {loggenerate} = require('../logger/logger');
const pharmacy = async (req,_res)=>{
    let result;
    try{
        result = await gettabletlist(req).then((data)=>{
            console.log("Successfully handled the information",data);
            return data;
        }).catch((err)=>{
            console.log("Return failure from server",err);
            loggenerate.error("Medicine List Return Failure from server");
            return err;
        })
        throw result;
    }catch(e)
    {
        console.log("Getting Error while Transferring data",e);
    }
    return result;
}
const reportgeneration = async(object)=>{
  let result;
    try{
    result = await storetestreport(object).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
    }).catch((err)=>{
             console.log("Return failure from server",err);
            loggenerate.error("Can't generated Test report Failure from server");
            return err;
    })
    throw result;
    }catch(e)
    {
        console.log("Error",e);
    }
    return result;
}
const getreport = async(object)=>{
   let result;
    try{
    result = await gettestreport(object).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
     }).catch((error=>{
        console.log("Return failure from server",error);
                loggenerate.error("Can't generated Test report Failure from server");
                return error;
     }))
 
    throw result;
    }catch(e)
    {
        console.log("Error",e);
    }
    return result;
}
//implemented using promise
const checkdoctorlogin = async(object)=>{
   let result;
    try{
        
     result = await checkdoctorauth(object).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
    }).catch((err)=>{
             console.log("Return failure from server",err);
            loggenerate.error("Can't Get a Doctor details from the server");
            return err;
    })
    throw result;
    }
    catch(e)
    {
        console.log("error",e)
    }
    return result;
}

const deletepatient = async(object)=>{
    let result;
    try{
     result = await patientdelete(object).then((data)=>{
        console.log("successfully handled the information",data);
        return data;
    }).catch((err)=>{
        console.log("error failure from server",err);
        loggenerate.error("can't store into db");
        return err;
    })
    throw result;
    }
    catch(e)
    {
        console.log("Error",e);
    }
    return result;
}
const storepatientdata = async(object)=>{
    let retresult;
    try{
    retresult = await newpatinetrecord(object).then((data)=>{
        console.log("successfully handled the information",data);
        return data;
    }).catch((error=>{
        console.log("Error message",error);
    }))
    throw retresult;
    }
    catch(e)
    {
        console.log("Error",e);
    }
    return retresult;
}
const fetchpatients = async(object)=>{
   let retresult;
    try{
     retresult = await availability(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
    })
    throw retresult;
    }
    catch(e)
    {
        console.log("Error",e);
    }
    return retresult;
}
const docslist = async(object)=>{
   let retresult;
    try{
     retresult = await getalldoctors(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
        loggenerate.error("cant get a doctor details from the server");
    })
    throw retresult;
    }
    catch(e)
    {
        console.log("Error",e);
    }
    return retresult;
}
const storedoctordetails = async(object)=>{
    let retresult;
    try{
    retresult = await storedoctorinformation(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
        loggenerate.error("cant get a doctor details from the server");
    })
    throw retresult;
    }
    catch(e)
    {
        console.log("Error",e);
    }
    return retresult;
}
const bookingstat = async(object)=>{
    let booking;
    try{
    booking = await getbookrequest(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
        loggenerate.error("cant get a doctor details from the server");
    })
    throw booking;
    }
    catch(e)
    {
        console.log("error",e);
    }
    return booking;
}
const waitingforbook = async(updateparams,reference)=>{
    let updatebooking;
    try{
     updatebooking = await bookappointment(updateparams,reference).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
    }).catch((err)=>{
             console.log("Return failure from server",err);
            loggenerate.error("Can't book a patient details into the server");
            return err;
    })
    throw updatebooking;
    }catch(e)
    {
        console.log("Error",e);
    }
    return updatebooking;
}
const admincheck = async(adminreference)=>{
    let adminAvail;
    try
    {
    adminAvail = await adminlogin(adminreference).then((data)=>{
        console.log("admin details",data);
        return data;
    }).catch((err)=>{
        loggenerate.error("admin not available",err);
    })
    throw adminAvail;
    }
    catch(e)
    {
        console.log("Error",e);
    }
    return adminAvail;
}
module.exports = {admincheck,pharmacy,reportgeneration,getreport,deletepatient,storepatientdata,fetchpatients,checkdoctorlogin,docslist,storedoctordetails,bookingstat,waitingforbook}