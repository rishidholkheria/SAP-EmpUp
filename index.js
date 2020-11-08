const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
global.__basedir = __dirname;

//configure
const app = express();
const router = express.Router();
dotenv.config();

//connect to database
const connect = mongoose.connect(process.env.MONGOCONNECT,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('Connected to database');
});

//import routes
const uploadXLRoute = require('./routes/uploadXL');

//middlewares
app.use('/api/upload-employee-data',uploadXLRoute);

//listening on port
const PORT = 3000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});