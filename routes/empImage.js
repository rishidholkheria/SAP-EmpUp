const express = require('express');
const boydeparser = require('body-parser');
const path = require('path');
const crypto = require('crypto');   //for generating the file names
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Employee = require('../schema/Employee');

const app = express();
const router = express.Router();
dotenv.config();

//Middleware

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine','ejs');

router.post('/',(req,res,next)=>{
    var emmployee = new Employe({
        image: req.body.image,
        empId: req.body.empId
    })
});