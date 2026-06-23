const Employee=require('../Models/employeeModel');

const getAllEmployees=async(req,res)=>{
    try{
        const employees=await Employee.findAll();
        res.json(employees);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const getEmployeeById=async(req,res)=>{
    try{
        const employeeId=req.params.id;
        const employee=await Employee.findByPk(employeeId);
        if(!employee){
            return res.status(404).json({error:'Employee not found'});
        }
        res.json(employee);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const createEmployee=async(req,res)=>{
    try{
        const {name,email,phone,department,position,salary,status}=req.body;
        const newEmployee=await Employee.create({name,email,phone,department,position,salary,status});
        res.status(201).json(newEmployee);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const updateEmployee=async(req,res)=>{
    try{
        const employeeId=req.params.id;
        const {name,email,phone,department,position,salary,status}=req.body;
        const employee=await Employee.findByPk(employeeId);
        if(!employee){
            return res.status(404).json({error:'Employee not found'});
        }
        await employee.update({name,email,phone,department,position,salary,status});
        res.json(employee);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const deleteEmployee=async(req,res)=>{
    try{
        const employeeId=req.params.id;
        const deletedEmployee=await Employee.destroy({where:{id:employeeId}});
        if(!deletedEmployee){
            return res.status(404).json({error:'Employee not found'});
        }
        res.json({message:'Employee deleted successfully'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

module.exports={getAllEmployees,getEmployeeById,createEmployee,updateEmployee,deleteEmployee};