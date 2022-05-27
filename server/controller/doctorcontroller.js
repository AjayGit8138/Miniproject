const {gettabletlist,storetestreport,checkdoctorauth, getalldoctors,storedoctorinformation, adminlogin} = require('../services/doctorsparser');
const {gettestreport,patientdelete,newpatinetrecord,availability,getbookrequest,bookappointment} = require('../services/patientoperation');
const {loggenerate} = require('../logger/logger');
var pharmacy = async (req,res)=>{
    console.log("******",req)
    try{
        var result = await gettabletlist(req).then((data)=>{
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
var reportgeneration = async(object)=>{
    console.log("report*****genereation",object);
    let result = await storetestreport(object).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
    }).catch((err)=>{
             console.log("Return failure from server",err);
            loggenerate.error("Can't generated Test report Failure from server");
            return err;
    })
    return result;
}
var getreport = async(object)=>{
    console.log("report*****genereation",object);
    let result = await gettestreport(object).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
    }).catch((err)=>{
             console.log("Return failure from server",err);
            loggenerate.error("Can't generated Test report Failure from server");
            return err;
    })
    return result;
}
//implemented using promise
var checkdoctorlogin = async(object)=>{
    console.log("doctorauth",object);
    let result = await checkdoctorauth(object).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
    }).catch((err)=>{
             console.log("Return failure from server",err);
            loggenerate.error("Can't Get a Doctor details from the server");
            return err;
    })
    return result;
}

var deletepatient = async(object)=>{
    console.log("Delete patient from controller",object);
    let result = await patientdelete(object).then((data)=>{
        console.log("successfully handled the information",data);
        return data;
    }).catch((err)=>{
        console.log("error failure from server",err);
        loggenerate.error("can't store into db");
        return err;
    })
    return result;
}
var storepatientdata = async(object)=>{
    let retresult = await newpatinetrecord(object).then((data)=>{
        console.log("successfully handled the information",data);
        return data;
    }).catch((err)=>{
        console.log("error failure from server",err);
        loggenerate.error("can't store into db");
        return err;
    })
    return retresult;
}
var fetchpatients = async(object)=>{
    console.log("Doctor id",object);
    var retresult = await availability(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
    })
    return retresult;
}
var docslist = async(object)=>{
    console.log("Doctor id",object);
    var retresult = await getalldoctors(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
        loggenerate.error("cant get a doctor details from the server");
    })
    return retresult;
}
var storedoctordetails = async(object)=>{
    
    var retresult = await storedoctorinformation(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
        loggenerate.error("cant get a doctor details from the server");
    })
    return retresult;
}
var bookingstat = async(object)=>{
    
    var booking = await getbookrequest(object).then((data)=>{
        console.log("successfully handled the information from server",data);
        return data;
    }).catch((err)=>{
        console.log(err);
        loggenerate.error("cant get a doctor details from the server");
    })
    return booking;
}
var waitingforbook = async(updateparams,reference)=>{
    let updatebooking = await bookappointment(updateparams,reference).then((data)=>{
        console.log("Successfully handled the information",data);
        return data;
    }).catch((err)=>{
             console.log("Return failure from server",err);
            loggenerate.error("Can't book a patient details into the server");
            return err;
    })
    return updatebooking;
}
var admincheck = async(adminreference)=>{
    let adminAvail = await adminlogin(adminreference).then((data)=>{
        console.log("admin details",data);
        return data;
    }).catch((err)=>{
        loggenerate.error("admin not available");
    })
    return adminAvail;
}
module.exports = {admincheck,pharmacy,reportgeneration,getreport,deletepatient,storepatientdata,fetchpatients,checkdoctorlogin,docslist,storedoctordetails,bookingstat,waitingforbook}