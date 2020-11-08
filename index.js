const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//configure
const app = express();
const router = express.Router();
dotenv.config();
mongoose.set('debug');

//connect to database
const connect = mongoose.connect(process.env.MONGOCONNECT,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('Connected to database');
});
module.exports = connect;

//import routes
const uploadXLRoute = require('./routes/uploadXL');
const uploadEmployee = require('./routes/addEmployee');
const createAnnouncement = require('./routes/announcement');

//middlewares
app.use('/api/upload-employee-data',uploadXLRoute);
app.use('/api/employee',uploadEmployee);
app.use('/api/announcement',createAnnouncement);

//listening on port
const PORT = 3000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

