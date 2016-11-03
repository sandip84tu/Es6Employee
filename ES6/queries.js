var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/employee';
var db = pgp(connectionString);
//Get all Employee
function getAllemployee(req, res, next) {
  db.any('select * from emp')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Employee'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//Get Single Employee by Id
function getSingleEmployee(req, res, next) {
  var empID = parseInt(req.params.id);
  db.one('select * from emp where id = $1', empID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Employee'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//Create New Employee
function createEmployee(req, res, next) {
    req.body.salary = parseInt(req.body.salary);
    db.none('insert into emp(name, salary, age, sex)' +
      'values(${name}, ${salary}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Employee'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//Update Employee by Id
function updateEmployee(req, res, next) {
    db.none('update emp set name=$1, salary=$2, age=$3, sex=$4 where id=$5',
        [req.body.name, req.body.salary, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Employee'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//Remove or Delete EMployee by Id
function removeEmployee(req, res, next) {
  var empID = parseInt(req.params.id);
  db.result('delete from emp where id = $1', empID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

//Export all API function from index.js
module.exports = {
    getAllemployee: getAllemployee,
    getSingleEmployee: getSingleEmployee,
    createEmployee: createEmployee,
    updateEmployee: updateEmployee,
    removeEmployee: removeEmployee
};
