const session = require('express-session');
const express    = require('express');
const app = express();
function createSession()
{
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: "secret", 
       }));
       console.log("session created ")
}

 function getSessionid(req,res)
{
    console.log(req.session)
    return req.session.id;
}

exports.createSession = createSession;
exports.getSessionid = getSessionid;