const {gettabletlist,storetestreport} = require('../services/doctorsparser');
const {gettestreport} = require('../services/patientoperation');
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

module.exports = {pharmacy,reportgeneration,getreport}