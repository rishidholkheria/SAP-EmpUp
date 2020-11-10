const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Organisation = require("../schema/Organisation");
router.use(express.json());

//connect to DB
const connect = require("../index");

router.post("/", (req, res) => {
  const organisation = new Organisation({
    orgName: req.body.orgName,
    orgLocation: req.body.orgLocation,
    orgType: req.body.orgType,
    orgEmail: req.body.orgEmail,
    orgContact: req.body.orgContact,
    orgWebsite: req.body.orgWebsite,
  });
  console.log(req.body);
  organisation.save((err, data) => {
    if (err) {
      res.send("Error: " + err);
    }
    res.send(data);
    console.log("created!");
  });
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
router.get("/:id", (req, res) => {
  Organisation.findOne({ oId: req.params.id }, (err, result) => {
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
