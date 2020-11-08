const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../schema/Admin');
router.use(express.json());

//connect to DB
const connect = require('../index');

router.post('/',(req,res)=>{
    const admin = new Admin({
        email: req.body.email,
        password: req.body.password
    });
    admin.save((err,data)=>{
        if(err){
            res.send("Error: "+err);
        }
        res.send(data);
        console.log('Admin created!');
    });
});

module.exports = router;