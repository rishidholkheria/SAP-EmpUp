const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Announcement = require("../schema/Announcement");
const genId = require("../utils/random");
const getDate = require("../utils/Date").getDate;
router.use(express.json());

const { verify } = require("jsonwebtoken");

var aId = genId(6);

router.post("/", (req, res) => {
  // if (req.user.isHR || req.user.isAdmin) {
  const announcement = new Announcement({
    aId: aId,
    aText: req.body.newPost.aText.tweetMessage,
    aImage: req.body.newPost.aImage.tweetImage,
    aDate: getDate(),
    orgId: req.body.newPost.orgId.organisationId,
  });
  console.log(req.body);
  announcement.save((err, data) => {
    if (err) {
      return res.send("Error: " + err);
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
  const announcement = await Announcement.find(
    { orgId: req.params.id },
    (err, result) => {
      if (!err) {
        return res.status(200).json({
          data: result,
          message: "All announcements..",
        });
      } else {
        res.status(400).json({
          data: {},
          message: "Some error occured..",
        });
      }
    }
  );
});

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
      return res.status(200).json({
        data: result,
        message: "Announcement fetched!",
      });
    } else {
      return res.status(400).json({
        data: {},
        message: "Some unexpected error occurred.",
      });
    }
  });
});

module.exports = { router, aId };
