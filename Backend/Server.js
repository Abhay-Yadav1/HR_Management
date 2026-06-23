const express=require('express');
const app=express();
const cors=require('cors');
const employeeRoutes=require('./Routes/employeeRoutes');
const sequelize=require('./Config/db');

app.use(cors());
app.use(express.json());
app.use('/api',employeeRoutes);

const port=5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

sequelize.sync()
    .then(()=>{
        console.log('Database synced...');
    })
    .catch(err=>{
        console.error('Error syncing database:', err);
    });

sequelize.authenticate()
    .then(()=>{
        console.log('Database connected...');
    })
    .catch(err=>{
        console.error('Unable to connect to the database:', err);
    });