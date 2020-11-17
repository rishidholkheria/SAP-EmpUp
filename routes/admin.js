const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");

const Admin = require('../schema/Admin');
const obj = require('../routes/organisation');

router.use(express.json());

router.post('/',(req,res)=>{
    var password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    const admin = new Admin({
        email: req.body.email,
        password: hashedPassword,
        oId: obj.oId
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