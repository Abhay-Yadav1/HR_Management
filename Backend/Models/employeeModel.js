const {DataTypes}=require('sequelize');
const sequelize=require('../Config/db');

const Employee=sequelize.define('Employee',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false
    },
    position:{
        type:DataTypes.STRING,
        allowNull:false
    },
    salary:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('Active','Inactive'),
        defaultValue:'Active'
    }
});

module.exports=Employee;