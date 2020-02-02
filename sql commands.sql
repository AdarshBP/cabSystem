USE attra_cab;

------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE `employeemanager` (
  `S No` int(11) NOT NULL AUTO_INCREMENT,
  `EMP_ID` int(11) NOT NULL,
  `EMP_NAME` varchar(45) DEFAULT NULL,
  `MANAGER_ID` int(11) DEFAULT '9999',
  PRIMARY KEY (`S No`),
  UNIQUE KEY `S No_UNIQUE` (`S No`),
  UNIQUE KEY `EMP_ID_UNIQUE` (`EMP_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employeepassword` (
  `S No` int(11) NOT NULL AUTO_INCREMENT,
  `EMP_ID` int(11) NOT NULL,
  `EMP_NAME` varchar(20) NOT NULL,
  `EMP_PASSWORD` varchar(45) NOT NULL,
  `ROLE` varchar(1) NOT NULL,
  PRIMARY KEY (`EMP_ID`),
  UNIQUE KEY `S No_UNIQUE` (`S No`),
  UNIQUE KEY `EMP ID_UNIQUE` (`EMP_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='employee password are stored here with flag indicating manager or other employee';

CREATE TABLE `employeetimelocation` (
  `S_No` int(11) NOT NULL AUTO_INCREMENT,
  `EMP_ID` int(11) NOT NULL,
  `START_DATE_TIME` datetime DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `START_LOCATION` varchar(100) NOT NULL,
  `END_LOCATION` varchar(100) NOT NULL,
  `LANDMARK` varchar(45) DEFAULT NULL,
  `STATUS` varchar(2) NOT NULL DEFAULT 'P',
  `REASON` varchar(100) NOT NULL,
  PRIMARY KEY (`S_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='This contains the details of the employee location and timings';


CREATE TABLE `employeeleavetracker` (
  `S_NO` int(11) NOT NULL AUTO_INCREMENT,
  `EMP_ID` varchar(45) NOT NULL,
  `LEAVE_START_DATE` date NOT NULL,
  `LEAVE_END_DATE` date NOT NULL,
  UNIQUE KEY `S_NO_UNIQUE` (`S_NO`),
  UNIQUE KEY `LEAVE_START_DATE_UNIQUE` (`LEAVE_START_DATE`),
  UNIQUE KEY `LEAVE_END_DATE_UNIQUE` (`LEAVE_END_DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

- -----------------------------------------------------------------------------------------------------------------------------------------


select * from employeepassword order by `S No` desc;
select * from employeetimelocation order by `S_No` asc;
select * from employeemanager order by `S No` asc;
select * from employeeleavetracker order by `EMP_ID` asc;


insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values ('1001','transportManger','0','T');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values ('901','manager1','0','M');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values ('902','manager2','0','M');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values ('101','user1','1','O');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values (102,'user2','2','O');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values (103,'user3','3','O');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values (104,'user4','4','O');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values (105,'user5','5','O');
insert into attra_cab.employeepassword  (EMP_ID,EMP_NAME,EMP_PASSWORD,ROLE) values (106,'user6','6','O');


DELETE FROM `attra_cab`.`employeepassword`
WHERE EMP_ID=0;


-- ------------------------------------------------------------------------------------------------------------------------------------------
SELECT * FROM `attra_cab`.`employeetimelocation` ;



INSERT INTO `attra_cab`.`employeetimelocation` (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`)VALUES (101,'2020-01-23 13:23:44','2999-12-31','EC2','BTM','NEAR LAKE','Daily commute');
INSERT INTO `attra_cab`.`employeetimelocation` (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`) VALUES (102,'2020-01-23 13:23:44','2999-12-31','EC2','BTM','NEAR LAKE','Daily commute');
INSERT INTO `attra_cab`.`employeetimelocation` (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`) VALUES (103,'2020-01-23 13:23:44','2999-12-31','EC2','BTM','NEAR LAKE','Daily commute');
INSERT INTO `attra_cab`.`employeetimelocation`  (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`) VALUES (104,'2020-01-23 13:23:44','2999-12-31','EC2','BTM','NEAR LAKE','Daily commute');
INSERT INTO `attra_cab`.`employeetimelocation`  (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`)VALUES (105,'2020-01-23 13:23:44','2999-12-31','EC2','BTM','NEAR LAKE','Daily commute');
INSERT INTO `attra_cab`.`employeetimelocation`  (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`) VALUES (106,'2020-01-23 13:23:44','2999-12-31','EC2','BTM','NEAR LAKE','Daily commute');

INSERT INTO `attra_cab`.`employeetimelocation`  (`EMP_ID`,`START_DATE_TIME`,`END_DATE`,`START_LOCATION`,`END_LOCATION`,`LANDMARK`,`REASON`,`STATUS`) VALUES (102,'2020-01-23T00:30:44','2020-01-24','EC2','BTM','NEAR LAKE','sql checking','TA');

UPDATE `attra_cab`.`employeetimelocation` SET `STATUS`= 'P' WHERE `EMP_ID` = '2';
UPDATE `attra_cab`.`employeetimelocation` SET `STATUS`= 'MA' WHERE `EMP_ID` = '2';

UPDATE `attra_cab`.`employeetimelocation`
SET `START_DATE_TIME`= '2020-01-13 13:23:44' , `END_DATE` = '2999-12-30' , `START_LOCATION` = 'EC2' , `END_LOCATION` = 'BTM' ,`LANDMARK` = 'NEAR LAKE', `REASON` = 'Daily commute' , `STATUS` = 'P'
WHERE `S No` = '1';

--------------------------------------------------------------------------------------------------------------------------------------------
select * from employeemanager order by `S No` asc;

insert into attra_cab.employeemanager  (EMP_ID,EMP_NAME,MANAGER_ID) values (101,'user1',901);
insert into attra_cab.employeemanager  (EMP_ID,EMP_NAME,MANAGER_ID) values (102,'user2',901);
insert into attra_cab.employeemanager  (EMP_ID,EMP_NAME,MANAGER_ID) values (103,'user3',901);

insert into attra_cab.employeemanager  (EMP_ID,EMP_NAME,MANAGER_ID) values (104,'user4',902);
insert into attra_cab.employeemanager  (EMP_ID,EMP_NAME,MANAGER_ID) values (105,'user5',902);
insert into attra_cab.employeemanager  (EMP_ID,EMP_NAME,MANAGER_ID) values (106,'user6',902);
--------------------------------------------------------------------------------------------------------------------------------------------

select * from employeeleavetracker order by `EMP_ID` asc;
select `EMP_ID`,`LEAVE_START_DATE`,`LEAVE_END_DATE` from employeeleavetracker where  curdate() between `LEAVE_START_DATE` and `LEAVE_END_DATE` order by `EMP_ID` asc ;

select `EMP_ID` from employeeleavetracker where  curdate() between `LEAVE_START_DATE` and `LEAVE_END_DATE` ;

INSERT INTO `attra_cab`.`employeeleavetracker`(`EMP_ID`,`LEAVE_START_DATE`,`LEAVE_END_DATE`)
VALUES
(101,'2020-01-04','2020-01-04');



--------------------------------------------------------------------------------------------------------------------------------------------
SELECT employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS FROM employeetimelocation inner join employeemanager on employeetimelocation.EMP_ID =employeemanager.EMP_ID  and  MANAGER_ID='1'; 


SELECT employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS FROM employeetimelocation inner join employeemanager on employeetimelocation.EMP_ID =employeemanager.EMP_ID  and  MANAGER_ID='1';
	
Select CURRENT_DATE from dual;
SELECT * from employeetimelocation where STATUS not in ('P','D'); 

SELECT employeetimelocation.S_No,employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS 
FROM employeetimelocation
inner join employeemanager on 
employeetimelocation.EMP_ID =employeemanager.EMP_ID  where STATUS = 'TA' and curdate() between DATE(START_DATE_TIME) and END_DATE and employeetimelocation.EMP_ID not in (select `EMP_ID` from employeeleavetracker where  curdate() between `LEAVE_START_DATE` and `LEAVE_END_DATE`)
order by `S_No` desc;
 

SELECT employeetimelocation.S_No,employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,DATE(END_DATE),START_LOCATION,REASON,STATUS FROM employeetimelocation  inner join employeemanager on employeetimelocation.EMP_ID =employeemanager.EMP_ID  where STATUS = 'TA' and END_DATE >= curdate() order by `S_No` desc ;