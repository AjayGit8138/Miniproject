const {getTabletList,storeTestReport,checkDoctorAuth, getallDoctors,storeDoctorInformation, adminLogin} = require('../services/doctorsparser');
const {gettestReport,patientDelete,newPatinetRecord,availability,getbookRequest,bookAppointment} = require('../services/patientoperation');
const {loggenerate} = require('../logger/logger');
const pharMacy = async (req,_res)=>{
    let result;
    try{
        result = await getTabletList(req).then((data)=>{
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
const reportGeneration = async(object)=>{
  let result;
    try{
    result = await storeTestReport(object).then((data)=>{
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
const getReport = async(object)=>{
   let result;
    try{
    result = await gettestReport(object).then((data)=>{
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
const checkDoctorLogin = async(object)=>{
   let result;
    try{
        
     result = await checkDoctorAuth(object).then((data)=>{
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

const deletePatient = async(object)=>{
    let result;
    try{
     result = await patientDelete(object).then((data)=>{
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
const storePatientdata = async(object)=>{
    let retresult;
    try{
    retresult = await newPatinetRecord(object).then((data)=>{
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
const fetchPatients = async(object)=>{
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
const docsList = async(object)=>{
   let retresult;
    try{
     retresult = await getallDoctors(object).then((data)=>{
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
const storeDoctorDetails = async(object)=>{
    let retresult;
    try{
    retresult = await storeDoctorInformation(object).then((data)=>{
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
const bookingStat = async(object)=>{
    let booking;
    try{
    booking = await getbookRequest(object).then((data)=>{
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
const waitingForBook = async(updateparams,reference)=>{
    let updatebooking;
    try{
     updatebooking = await bookAppointment(updateparams,reference).then((data)=>{
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
const adminCheck = async(adminreference)=>{
    let adminAvail;
    try
    {
    adminAvail = await adminLogin(adminreference).then((data)=>{
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
module.exports = {adminCheck,pharMacy,reportGeneration,getReport,deletePatient,storePatientdata,fetchPatients,checkDoctorLogin,docsList,storeDoctorDetails,bookingStat,waitingForBook}