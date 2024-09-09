const express = require('express');
const { createNewEmployee, getAllEmployees, getAllEmployeesById, updateEmployeeById, deleteEmployeeById } = require('../controller/employee');
const router = express.Router()


router.route('/employee').post(createNewEmployee).get(getAllEmployees)
router.route('/employee/:id')
    .get(getAllEmployeesById)
    .put(updateEmployeeById)
    .delete(deleteEmployeeById);

module.exports = router