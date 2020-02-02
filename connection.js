const mysql      = require ('mysql');


var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'attra_cab',
    timezone : 'Z'
});

con.connect((err)=>{
    if(err) console.log(err);
    console.log("database connected sucessfully");
});

module.exports = con;