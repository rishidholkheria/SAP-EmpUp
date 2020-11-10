const express = require("express");
const app = express();
const router = express.Router();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Organisation = require('../schema/Organisation');
const genId = require('../utils/random');



//connect to DB
const connect = require("../index");

router.post('/',(req,res)=>{
    const organisation = new Organisation({
        oId: genId(6),
        orgName: req.body.orgName,
        orgLocation: req.body.orgLocation,
        orgType: req.body.orgType,
        orgEmail: req.body.orgEmail,
        orgWebsite: req.body.orgWebsite,
        monthlyGoal: req.body.monthlyGoal,
        notice: req.body.notice
    });
    console.log(req.body);
    organisation.save((err,data)=>{
        if(err){
            res.send("Error: "+err);
        }
        res.send(data);
        console.log('created!');
    });

//update monthly goals
router.patch('/monthly-goal/update/:id',(req,res)=>{
    var id = req.params.id;
    Organisation.findOne({_id: id}, (err, monthlyGoal)=>{
        if(err) return res.status(500).send('Not found');
        if(!monthlyGoal) return res.status(404).send();
        if(req.body.monthlyGoal){

        }
    });
});

//post notices
router.put('/notices',(req,res)=>{
    Organisation.update(
      {$push: {notice: req.body.notice}},  
    );
});

//get all organisation
router.get("/", async (req, res) => {
  const organisation = await Organisation.find({}, (err, result) => {
    if (!err) {
      res.status(200).json({
        data: result,
        message: "All organisation..",
      });
    } else {
      res.status(400).json({
        data: {},
        message: "Some error occured..",
      });
    }
  });
});

//get api for a specific organisation
router.get('/:id',(req,res)=>{
    Organisation.findOne({oId: req.params.id},(err,result)=>{

    //check if motivation exists
    if (!result)
      return res.status(404).json({
        data: {},
        message: "No such organisation exist. Please check and try again later",
      });

    //if exist and no err
    if (!err) {
      res.status(200).json({
        data: result,
        message: "Organisation fetched!",
      });
    } else {
      res.status(400).json({
        data: {},
        message: "Some unexpected error occurred.",
      });
    }
  });
});

module.exports = router;
