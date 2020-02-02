
-- daily list comapring with the leave tracker  
SELECT employeetimelocation.S_No,employeetimelocation.EMP_ID,EMP_NAME,START_DATE_TIME,END_DATE,START_LOCATION,REASON,STATUS 
FROM employeetimelocation
 inner join employeemanager on 
employeetimelocation.EMP_ID =employeemanager.EMP_ID 
and STATUS = 'TA' and curdate() between DATE(START_DATE_TIME) and END_DATE
inner join employeeleavetracker on 
employeetimelocation.EMP_ID <> employeeleavetracker.EMP_ID
where curdate() between `LEAVE_START_DATE` and `LEAVE_END_DATE`;