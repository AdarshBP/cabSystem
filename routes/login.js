const express = require('express');
const path=require('path');
const rootdir = require("../util/path");
const session = require('express-session');
const Router = express.Router();
const con =require('../connection');




Router.get('/',(req,res)=>
{
    console.log(req.session);
    //checks if the session is present and log in accordingly 
    if(req.session.empid != "")
    {
        if(req.session.role == 'M')
            res.redirect('/manager/approval');  
        else  if(req.session.role == 'O')
            res.redirect('/myRequests'); 
        else  if(req.session.role == 'T')
            res.redirect('/traveladmin');    
    }

 
    res.render(path.join(rootdir,'views','login'));
});

Router.get('/logOut',(req,res)=>
{
    req.session.destroy();
    res.redirect('/');
});


Router.post('/loginCheck',(req,res)=>
{
    console.log('fresh session is being established ');
    let empid=req.body.UserID;
    let password =req.body.Password;
    console.log(empid + password)
    let query = "SELECT * FROM employeepassword where EMP_ID="+ empid;
    con.query(query, function (err, result) {
        if (err) console.log(err);
        if (result.length != 0 && result[0].EMP_PASSWORD == password)
        {
            req.session.empid = result[0].EMP_ID;
            req.session.empName = result[0].EMP_NAME;
            req.session.role = result[0].ROLE;

            if(result[0].ROLE == 'M')
                res.redirect('/manager/approval');  
            else if(result[0].ROLE == 'O')
                res.redirect('/myRequests'); 
            else if(result[0].ROLE == 'T')
                res.redirect('/traveladmin');    
        }else
        {
            console.log(' Please enter the vaild credentials');
            
            res.redirect('/');
        }
      });
    
});

module.exports = Router;