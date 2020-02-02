const express = require('express');
const path = require('path');
const rootdir = require("../util/path");
const Router = express.Router();
const con = require('../connection');
var auth = function (req, res, next) {
    if (req.session.empid == undefined) 
        res.redirect('/');
    else
        next();
  }


//========================= travel Admin Routes ===============================
Router.get('/traveladmin',auth, (req, res) => {
    let query = "SELECT employeetimelocation.S_No,employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS " +
        "FROM employeetimelocation" +
        " inner join employeemanager on " +
        "employeetimelocation.EMP_ID =employeemanager.EMP_ID  and STATUS not in ('P','D','X')";

    con.query(query, function (err, result) {
        if (err) throw err;
        let pending_data = [];
        let TravelmangerApproved_data = [];
        let TravelmangerDisapproved_data = [];
        result.forEach(element => {
            if (element.STATUS == 'MA')
                pending_data.push(element);
            else if (element.STATUS == 'TA')
                TravelmangerApproved_data.push(element);
            else if (element.STATUS == 'TD')
                TravelmangerDisapproved_data.push(element);
        });
        let data = {
            pending_data: pending_data,
            TravelmangerApproved_data: TravelmangerApproved_data,
            TravelmangerDisapproved_data: TravelmangerDisapproved_data
        };
        //console.log(data);
        res.render(path.join(rootdir, 'views', 'adminApproval'), {
            data
        });
    });
});

Router.post('/admin/user-cab-approve',auth, (req, res) => {
    let query = "UPDATE `attra_cab`.`employeetimelocation` SET `STATUS`= 'TA' WHERE `S_No` =" + req.body.SNo;
    con.query(query, function (err, result) {
        if (err) throw err;
        //console.log(result);
        res.redirect('/traveladmin');
    });
});

Router.post('/admin/user-cab-disapprove',auth, (req, res) => {
    let query = "UPDATE `attra_cab`.`employeetimelocation` SET `STATUS`= 'TD' WHERE `S_No` =" + req.body.SNo;
    con.query(query, function (err, result) {
        if (err) throw err;
        //console.log(result);
        res.redirect('/traveladmin');
    });
});

Router.get('/MasterList',auth, (req, res) => {
    let query = "SELECT employeetimelocation.S_No,employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS " +
        "FROM employeetimelocation" +
        " inner join employeemanager on " +
        "employeetimelocation.EMP_ID =employeemanager.EMP_ID  and STATUS = 'TA' and END_DATE >= curdate() " +
        "order by `S_No` desc";

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        let dailyList = [];
        let specialList = [];


        result.forEach((rowData) => {
            rowData.START_DATE_TIME = rowData.START_DATE_TIME.toISOString().slice(0, 16);
            let endYear = rowData.END_DATE.getFullYear();
            rowData.END_DATE = rowData.END_DATE.toISOString().slice(0, 10);

            if (endYear == '2999')
                dailyList.push(rowData);
            else
                specialList.push(rowData);
        });
        let data = {
            dailyList: dailyList,
            specialList: specialList
        }
        console.log(data);
        res.render(path.join(rootdir, 'views', 'masterList'), {
            data
        });
    });
});

Router.get('/dailyList',auth, (req, res) => {

    let query = "SELECT employeetimelocation.S_No,employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS " +
        "FROM employeetimelocation" +
        " inner join employeemanager on " +
        "employeetimelocation.EMP_ID =employeemanager.EMP_ID " +
        "and STATUS = 'TA' and curdate() between DATE(START_DATE_TIME) and END_DATE " +
        "inner join employeeleavetracker on " +
        "employeetimelocation.EMP_ID <> employeeleavetracker.EMP_ID " +
        "where curdate() between employeeleavetracker.LEAVE_START_DATE and employeeleavetracker.LEAVE_END_DATE"


    con.query(query, function (err, result) {
        if (err) throw err;
        let dailyList = [];
        let specialList = [];
        let today = new Date().toDateString();
        result.forEach((rowData) => {
            rowData.START_DATE_TIME = rowData.START_DATE_TIME.toISOString().slice(0, 16);
            let endYear = rowData.END_DATE.getFullYear();
            rowData.END_DATE = rowData.END_DATE.toISOString().slice(0, 10);
            if (endYear == '2999')
                dailyList.push(rowData);
            else
                specialList.push(rowData);
        });
        let data = {
            dailyList: dailyList,
            specialList: specialList
        }
        console.log(data);
        res.render(path.join(rootdir, 'views', 'dailyList'), {
            data
        });
    });
});
//============================manager routes ==============================
Router.get('/manager/approval',auth, (req, res) => {
        let empid = req.session.empid;
        let query = "SELECT employeetimelocation.EMP_ID,employeetimelocation.S_No,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS" +
            " FROM employeetimelocation " +
            "inner join employeemanager " +
            "on employeetimelocation.EMP_ID =employeemanager.EMP_ID  and  employeemanager.MANAGER_ID=" + empid;
        con.query(query, function (err, result) {
            if (err) throw err;
            let pending_data = [];
            let mangerApproved_data = [];
            let mangerDisapproved_data = [];
            result.forEach(element => {
                if (element.STATUS == 'P')
                    pending_data.push(element);
                else if (element.STATUS == 'MA')
                    mangerApproved_data.push(element);
                else if (element.STATUS == 'D')
                    mangerDisapproved_data.push(element);
            });
            let sessionData = {
                empid: req.session.empid,
                empName: req.session.empName,
                empRole: req.session.role
            }
            let data = {
                pending_data: pending_data,
                mangerApproved_data: mangerApproved_data,
                mangerDisapproved_data: mangerDisapproved_data,

            };
            //console.log(data);
            res.render(path.join(rootdir, 'views', 'managerHomePage'), {
                data,
                sessionData
            });

        });
});

Router.post('/manger/user-approve',auth, (req, res) => {
    console.log()
    let query = "UPDATE `attra_cab`.`employeetimelocation` SET `STATUS`= 'MA' WHERE `S_No` =" + req.body.SNo;
    con.query(query, function (err, result) {
        if (err) console.log(err);
        //console.log(result);

        res.redirect('/manager/approval');
    });

});

Router.post('/manger/user-disapprove',auth, (req, res) => {
    let query = "UPDATE `attra_cab`.`employeetimelocation` SET `STATUS`= 'D' WHERE `S_No` =" + req.body.SNo;
    con.query(query, function (err, result) {
        if (err) console.log(err);
        res.redirect('/manager/approval');
    });
});

//=============================  General routes ==============================
Router.get('/requestCab',auth, (req, res) => {

    let sessionData = {
        empid: req.session.empid,
        empName: req.session.empName,
        empRole: req.session.role
    }
    res.render(path.join(rootdir, 'views', 'requestCab'), {
        sessionData
    });
});

Router.post('/cabRequested',auth, (req, res) => {
    console.log("cab requested " + req.body);
    let query = " INSERT INTO `attra_cab`.`employeetimelocation` (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`) VALUES (?,?,?,?,?,?,?)";
    let sqldata = req.body;
    let values = [sqldata.empid, sqldata.startDateTime, sqldata.endDate, sqldata.startAddress, sqldata.endAddress, sqldata.landmark, sqldata.reason];
    con.query(query, values, function (err, result) {
        if (err) throw err;
        //console.log(result);
        let sessionData = {
            empid: req.session.empid,
            empName: req.session.empName,
            empRole: req.session.role
        }
        res.redirect('/alterTimings');
    });
});

Router.get('/myRequests',auth, (req, res) => {
    let empid = req.session.empid;
    let query = "SELECT `S_No`,`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION` " +
        "FROM `attra_cab`.`employeetimelocation` " +
        "where STATUS='TA' and END_DATE >= curdate()" +
        " and EMP_ID=" + empid;
    con.query(query, function (err, result) {
        if (err) throw err;
        //console.log(result);
        let bookingData = [];
        let today = new Date().toDateString();
        result.forEach((rowData) => {
            let isSpecialPass = true;
            if (rowData.END_DATE.getFullYear() == '2999')
                isSpecialPass = false
            let Sdata = {
                Sno: rowData['S_No'],
                Sdate: rowData.START_DATE_TIME,
                Edate: rowData.END_DATE,
                Stime: rowData.START_DATE_TIME.toISOString().slice(11, 16),
                Slocation: rowData.START_LOCATION,
                Elocation: rowData.END_LOCATION,
                isSpecialPass: isSpecialPass
            };
            bookingData.push(Sdata);
        });
        // console.log(bookingData);
        let sessionData = {
            empid: req.session.empid,
            empName: req.session.empName,
            empRole: req.session.role
        }
        res.render(path.join(rootdir, 'views', 'myrequest'), {
            bookingData,
            sessionData
        });
    });
});

Router.get('/alterTimings',auth, (req, res) => {
    let empid = req.session.empid;
    let query = "SELECT * FROM `attra_cab`.`employeetimelocation` where STATUS != 'A' and EMP_ID=" + empid + " and END_DATE >= curdate() order by `S_No` desc";
    con.query(query, function (err, result) {
        if (err) throw err;
        //console.log(result);
        let bookedData = [];
        var d = new Date();
        //d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // to convert to the Localtimings  -A
        //let today = d.toISOString().slice(0,10);  -A
        result.forEach((rowData) => {
            //if (rowData.START_DATE_TIME.toISOString().slice(0,10) >= today) -A
            {
                let isSpecialPass = true
                if (rowData.END_DATE.getFullYear() == '2999')
                    isSpecialPass = false
                let Sdata = {
                    Sno: rowData['S_No'],
                    Sdate: rowData.START_DATE_TIME,
                    Edate: rowData.END_DATE,
                    Stime: rowData.START_DATE_TIME.toISOString().slice(11, 16),
                    Slocation: rowData.START_LOCATION,
                    Elocation: rowData.END_LOCATION,
                    landmark: rowData.LANDMARK,
                    Reason: rowData.REASON,
                    isSpecialPass: isSpecialPass
                };
                bookedData.push(Sdata);
            }
        });
        let sessionData = {
            empid: req.session.empid,
            empName: req.session.empName,
            empRole: req.session.role
        }
        console.log(bookedData);
        res.render(path.join(rootdir, 'views', 'alterTimings'), {
            bookedData,
            sessionData
        });
    });

});

Router.post('/alterDetails',auth, (req, res) => {
    let query = "UPDATE `attra_cab`.`employeetimelocation` " +
        "SET `START_DATE_TIME`= ?," +
        "`END_DATE` = ?," +
        "`START_LOCATION` = ?," +
        "`END_LOCATION` = ?," +
        "`LANDMARK` = ?," +
        "`REASON` = ?," +
        "`STATUS` = 'P' " +
        "WHERE `S_No` = ?";

    let sqldata = req.body;
    let values = [sqldata.StartDateTime, sqldata.EndDate, sqldata.inputAddress, sqldata.endAddress, sqldata.landmark, sqldata.reason, sqldata.Sno];
    con.query(query, values, function (err, result) {
        if (err) console.log(err);
        res.redirect('/alterTimings');
    });
});

Router.get('/approvalStatus',auth, (req, res) => {
    let empid = req.session.empid;
    let query = "SELECT * FROM `attra_cab`.`employeetimelocation` where STATUS <> 'X' and EMP_ID=" + empid;
    con.query(query, function (err, result) {
        if (err) throw err;
        //console.log(result);
        let bookedData = [];
        result.forEach((rowData) => {
            {
                let isSpecialPass = true
                if (rowData.END_DATE.getFullYear() == '2999')
                    isSpecialPass = false
                let Sdata = {
                    Sno: rowData['S_No'],
                    Sdate: rowData.START_DATE_TIME,
                    Edate: rowData.END_DATE,
                    Stime: rowData.START_DATE_TIME.toISOString().slice(11, 16),
                    Slocation: rowData.START_LOCATION,
                    Elocation: rowData.END_LOCATION,
                    landmark: rowData.LANDMARK,
                    Reason: rowData.REASON,
                    isSpecialPass: isSpecialPass,
                    status: rowData.STATUS
                };
                bookedData.push(Sdata);
            }
        });
        console.log(bookedData);
        let sessionData = {
            empid: req.session.empid,
            empName: req.session.empName,
            empRole: req.session.role
        }
        res.render(path.join(rootdir, 'views', 'approvalStatus'), {
            bookedData,
            sessionData
        });
    });
});

Router.get('/leaveScreen',auth, (req, res) => {

    let sessionData = {
        empid: req.session.empid,
        empName: req.session.empName,
        empRole: req.session.role
    }
    res.render(path.join(rootdir, 'views', 'leavetracker'), {
        sessionData
    });
});

Router.post('/updateLeave',auth, (req, res) => {
    let query = "INSERT INTO `attra_cab`.`employeeleavetracker`(`EMP_ID`,`LEAVE_START_DATE`,`LEAVE_END_DATE`) VALUES (?,?,?)";
    let sqldata = req.body;
    let values = [sqldata.empid, sqldata.StartDate, sqldata.EndDate];
    con.query(query, values, function (err, result) {
        if (err) throw err;
        console.log("updated the leave tracker for " + sqldata.empid);
        res.redirect('/alterTimings');
    });
});

//===================================old data ============
Router.get('/test', (req, res) => {
    let query = "SELECT S_NO,START_DATE_TIME,END_DATE FROM employeetimelocation where S_NO= '1'";
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log(result[0].START_DATE_TIME.toISOString().slice(11, 16));
    });
});

Router.get('/old_xalterTimings', (req, res) => {
    let empid = req.session.empid;
    let query = "SELECT * FROM `attra_cab`.`employeetimelocation` where STATUS != 'A' and EMP_ID=" + empid + " and END_DATE >= curdate() order by `S_No` desc";
    con.query(query, function (err, result) {
        if (err) throw err;
        //console.log(result);
        let bookedData = [];
        var d = new Date();
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // to convert to the Localtimings
        let today = d.toISOString().slice(0, 10);
        result.forEach((rowData) => {
            //if (rowData.START_DATE_TIME.toISOString().slice(0,10) >= today)
            {
                let isSpecialPass = true
                if (rowData.END_DATE.getFullYear() == '2999')
                    isSpecialPass = false
                let Sdata = {
                    Sno: rowData['S_No'],
                    Sdate: rowData.START_DATE_TIME.toLocaleDateString(),
                    Edate: rowData.END_DATE.toLocaleDateString(),
                    Stime: rowData.START_DATE_TIME.getHours() + ":" + rowData.START_DATE_TIME.getMinutes(),
                    Slocation: rowData.START_LOCATION,
                    Elocation: rowData.END_LOCATION,
                    landmark: rowData.LANDMARK,
                    Reason: rowData.REASON,
                    isSpecialPass: isSpecialPass
                };
                bookedData.push(Sdata);
            }
        });
        console.log(bookedData);
        res.render(path.join(rootdir, 'views', 'alterTimings'), {
            bookedData
        });
    });

});

module.exports = Router;