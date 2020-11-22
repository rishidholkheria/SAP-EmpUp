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
const { verify } = require("jsonwebtoken");

var aId = genId(6);

//needs orgId in req
router.post("/", (req, res) => {
  // if (req.user.isHR || req.user.isAdmin) {
    const announcement = new Announcement({
      aId: aId,
      aText: req.body.newPost.aText.tweetMessage,
      aImage: req.body.newPost.aImage.tweetImage,
      aDate: getDate(),
      oId: req.body.newPost.orgId.organisationId
    });
    console.log(req.body);
    announcement.save((err, data) => {
      if (err) {
        res.send("Error: " + err);
      }
      res.send(data);
      console.log("Announcement created!");
    });
//   }
//   else {
//     return res.json({
//       data: null,
//       message: 'You are not authorised. What are you trying to do?'
//     });
//   }
});


//get all announcements
router.get("/:id", async (req, res) => {
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

//access token needed from frontend
//get api for a specific annoucement
router.get("/single/:id", (req, res) => {
  Announcement.findOne({ oId: req.body.id }, (err, result) => {
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

module.exports = {router, aId};
