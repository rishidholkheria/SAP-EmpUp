const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Motivation = require('../schema/Motivation');
const getDate = require('../utils/date');
router.use(express.json());

//connect to DB
const connect = require('../index');

router.post('/',(req,res)=>{
    const motivation = new Motivation({
        motivation: req.body.motivation,
        mDate: getDate()
    });
    console.log(req.body);
    motivation.save((err,data)=>{
        if(err){
            res.send("Error: "+err);
        }
        res.send(data);
        console.log('created!');
    });
});

//get all motivation
router.get('/',async(req,res)=>{
    const motivation = await Motivation.find({}, (err, result) => {
        if(!err){
            res.status(200).json({
                data: result,
                message: "All motivation.."
            });
        }
        else{
            res.status(400).json({
                data: {},
                message: "Some error occured.."
            }); 
        }
    });
    
});

//get api for a specific motivation
router.get('/:id',(req,res)=>{
    Motivation.findOne({mId: req.params.id},(err,result)=>{
    //check if motivation exists
    if(!result) return res.status(404).json({
        data:{},
        message: 'No such motivation exist. Please check and try again later'
    });

    //if exist and no err
    if(!err){
        res.status(200).json({
            data:result,
            message:"Motivation fetched!"
        });
    }
    else{
        res.status(400).json({
            data:{},
            message: 'Some unexpected error occurred.'
        });
    }
    });
    
});

module.exports = router;