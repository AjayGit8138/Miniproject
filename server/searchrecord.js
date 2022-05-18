var nano = require('nano');
const url = "https://apikey-v2-qnl37sqy0oqwj8owtrhj6kam3p39wzmc0d46oflhvln:cb14c8c9976ced0867c79d8eb625505a@a1b21745-8512-41b2-8506-c83a13a27993-bluemix.cloudant.com";
const nanodb = nano(process.env.COUCHDB_URL || url);
const hospitaldb = nanodb.use('hospital_admission');

var selectquery = {
    "selector": {
       "patientdata": {
          "$gte": "patient"
       }
    }
 }

 var emailquery = {
    selector:{
        "email":"prasathmajay@gmail.com",
        "category":"patient"
    }
}

 hospitaldb.find(emailquery || selectquery).then((data)=>{
    console.log("email id matched documents fetched from database",data);
    return data;
}).catch((err)=>{
    console.log("EmailId doesn't Exists in database",err);
})