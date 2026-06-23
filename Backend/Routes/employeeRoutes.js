const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
    updateEmployee}=require('../Controllers/employeeController');
const express=require('express');
const router=express.Router();

router.get('/employees',getAllEmployees);
router.get('/employees/:id',getEmployeeById);
router.post('/employees',createEmployee);
router.delete('/employees/:id',deleteEmployee);
router.put('/employees/:id',updateEmployee);

module.exports=router;