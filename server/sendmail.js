const nodemail = require('nodemailer');

var sender = nodemail.createTransport({
    service:'gmail',
    auth:{
        user:'akhospital12@gmail.com',
        pass:'akhosp@123'
    }
})


// sender.sendMail(composemail,function(err,res){
//     if(err)
//     {
//         console.log("Mail not sent",err);
//     }
//     else{
//         console.log("Mail sent");
//     }
// })

var mail = async (mailparams,information)=>{
    console.log(mailparams);
    var returnobject  = new Promise((resolve,reject)=>{
        if(mailparams == undefined || information == undefined)
        {
            reject();
        }
        else{
            resolve(

                composemail = {
                    from:'akhospital12@gmail.com',
                    to:mailparams,
                    subject:'node email',
                    text:'Hi Patient Your request is granted,your booking date and time is mentioned below ' + `${information.timingforappointment}` + `${information.doctorassign}` + `${information.dateofappointment}`
                },

                sender.sendMail(composemail,function(err,res){
                    if(err)
                    {
                        console.log("Mail not sent",err);
                    }
                    else{
                        console.log("Mail sent");
                    }
                })
            )
        }
        
    })
    return returnobject;
}

module.exports = {mail};