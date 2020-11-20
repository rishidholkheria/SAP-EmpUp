const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Feedback = require("../schema/Feedback");
const getDate = require("../utils/date");
const genId = require("../utils/random");
router.use(express.json());

//connect to DB
const connect = require("../index");

router.post("/", (req, res) => {
  const feedback = new Feedback({
    feedback: req.body.feedback,
    fTitle: req.body.fTitle,
    fDept: req.body.fDept,
    cDate: getDate(),
  });
  feedback.save((err, data) => {
    if (err) {
      res.send("Error: " + err);
    }
    res.send(data);
    console.log("created!");
  });
});

//get all feedback
router.get("/", async (req, res) => {
  const feedback = await Feedback.find({}, (err, result) => {
    if (!err) {
      res.status(200).json({
        data: result,
        message: "All feedback..",
      });
    } else {
      res.status(400).json({
        data: {},
        message: "Some error occured..",
      });
    }
  });
});

//get api for a specific feedback
router.get("/:id", (req, res) => {
  Feedback.findOne({ _id: req.params.id }, (err, result) => {
    //check if feedback exists
    if (!result)
      return res.status(404).json({
        data: {},
        message: "No such feedback exist. Please check and try again later",
      });

    //if exist and no err
    if (!err) {
      res.status(200).json({
        data: result,
        message: "Feedback fetched!",
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
