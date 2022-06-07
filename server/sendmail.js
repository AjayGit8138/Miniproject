const nodemail = require('nodemailer');

const sender = nodemail.createTransport({
    secure: true,
    requireTLS: true, 
    port: 465,
    secured: true,
    service:'gmail',
    auth:{
        user:'akhospital12@gmail.com',
        pass:'akhosp@123'
    }
})
const mail = async (mailparams,information)=>{
    return new Promise((resolve,reject)=>{
        if(mailparams == undefined || information == undefined)
        {
            reject();
        }
        else{
                let composemail = {
                    from:'akhospital12@gmail.com',
                    to:mailparams,
                    subject:'node email',
                    text:'Hi Patient Your request is granted,your booking date and time is mentioned below ' + `${information.timingforappointment}` + `${information.doctorassign}` + `${information.dateofappointment}`
                }
                sender.sendMail(composemail,function(err,_res){
                    if(err)
                    {
                        console.log("Mail not sent",err);
                    }
                    else{
                        console.log("Mail sent");
                    }
                })
            return resolve(composemail);
        }
        
    })
   
}

module.exports = {mail};