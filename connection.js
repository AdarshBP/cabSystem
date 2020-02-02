const mysql = require ('mysql');

var config = require('./config')[environment];

console.log("you are in "+environment + " environment");

var con=mysql.createConnection({
    host    : config.database.host,
    user    : config.database.user,
    password: config.database.password,
    database: config.database.database,
    timezone: config.database.timezone
});

con.connect((err)=>{
    if(err) console.log(err);
    console.log("database connected sucessfully");
});

module.exports = con;