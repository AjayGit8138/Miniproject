function getdata(params)
{
    console.log("From getdata",params);
   
    db.find(params[0]).then(data=>{
        console.log("found data",data);
    })
}
getdata(searchval);