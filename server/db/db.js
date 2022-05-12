var nano = require('nano');
var url = 'https://a1b21745-8512-41b2-8506-c83a13a27993-bluemix.cloudantnosqldb.appdomain.cloud/hospital_admission/_all_docs';
var username= 'apikey-v2-qnl37sqy0oqwj8owtrhj6kam3p39wzmc0d46oflhvln';
var password = 'cb14c8c9976ced0867c79d8eb625505a';
var cloudant =  nano({ url: url, username: username, password: password });

nano.db.create('dummy').then(() => {
    cloudant.use('alice').insert({ happy: true }, 'rabbit').then((data) => {
      console.log(data); 
    });
  }).catch((err) => {
    console.log(err);
  });
