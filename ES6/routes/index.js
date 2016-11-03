var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/employee', db.getAllemployee);  //API for get all employee(to retrieve all employee API use baseurl+/api/employee)
router.get('/api/employee/:id', db.getSingleEmployee); //API Get Employee by Id (to retrieve single employee API use baseurl+/api/employee/id)
router.post('/api/createEmployee', db.createEmployee);    //API Create new EMployee (to Create employee API use baseurl+/api/createEmployee)
router.put('/api/Updateemployee/:id', db.updateEmployee);  //API Update Employee by Id  (to update employee API use baseurl+/api/Updateemployee/id)
router.delete('/api/deleteEmp/:id', db.removeEmployee);  // API Delete Employee by Id (to delete employee API use baseurl+/api/deleteEmp/id)


module.exports = router;