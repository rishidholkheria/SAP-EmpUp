const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Announcement = require('../schema/Announcement');
const genId = require('../utils/random');
const getDate = require('../utils/date')
router.use(express.json());

//connect to DB
const connect = require('../index');

router.post('/create-new',(req,res)=>{
    const announcement = new Announcement({
        aId: genId(6),
        aText: req.body.aText,
        aImage: req.body.aImage,
        aDate: getDate()
    });
    console.log(req.body);
    announcement.save((err,data)=>{
        if(err){
            res.send("Error: "+err);
        }
        res.send(data);
        console.log('created!');
    });
});

module.exports = router;