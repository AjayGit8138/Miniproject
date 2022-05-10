const file = require('fs');

module.exports.maintainpatientdata =  function (paramsvalue){
    console.log(paramsvalue);
    var retval;
    var availpatients = file.readFileSync('./db/totalpatient.json');
    var listofpatients = JSON.parse(availpatients);
       console.log("from service",listofpatients);
    
       for(let x in listofpatients)
       {
           if(listofpatients[x].category === paramsvalue)
           {
              retval =  listofpatients[x].noofpatients = listofpatients[x].noofpatients+1;
           }
       }
       file.writeFile('./db/totalpatient.json', JSON.stringify(listofpatients), (err) => {
      
        if (err) throw err;
      
        console.log('Patient Data added successfully'); 
        
        
      });
   
   
    return retval;
}

