const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Announcement = require("../schema/Announcement");
const genId = require("../utils/random");
const getDate = require("../utils/date");
router.use(express.json());

//connect to DB
const connect = require("../index");

router.post("/", (req, res) => {
  const announcement = new Announcement({
    aId: genId(6),
    aText: req.body.newPost.aText.tweetMessage,
    aImage: req.body.newPost.aImage.tweetImage,
    aDate: getDate(),
  });
  console.log(req.body);
  announcement.save((err, data) => {
    if (err) {
      res.send("Error: " + err);
    }
    res.send(data);
    console.log("created!");
  });
});

//get all announcements
router.get("/", async (req, res) => {
  const announcement = await Announcement.find({}, (err, result) => {
    if (!err) {
      res.status(200).json({
        data: result,
        message: "All announcements..",
      });
    } else {
      res.status(400).json({
        data: {},
        message: "Some error occured..",
      });
    }
  });
});

//get api for a specific annoucement
router.get("/:id", (req, res) => {
  Announcement.findOne({ aId: req.params.id }, (err, result) => {
    //check if announcement exists
    if (!result)
      return res.status(404).json({
        data: {},
        message: "No such announcement exist. Please check and try again later",
      });

    //if exist and no err
    if (!err) {
      res.status(200).json({
        data: result,
        message: "Announcement fetched!",
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
