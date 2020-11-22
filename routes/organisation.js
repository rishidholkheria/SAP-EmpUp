const express = require("express");
const app = express();
const router = express.Router();
const dotenv = require("dotenv");
const Organisation = require("../schema/Organisation");
const genId = require("../utils/random");
const verify = require("../middlewares/verify");

router.use(express.json());

const oId = genId(6);

router.post("/", (req, res) => {
  const organisation = new Organisation({
    oId: oId,
    orgName: req.body.orgName,
    orgLocation: req.body.orgLocation,
    orgType: req.body.orgType,
    orgEmail: req.body.orgEmail,
    orgWebsite: req.body.orgWebsite,
    monthlyGoal: req.body.monthlyGoal,
    notice: req.body.notice,
  });
  // console.log(req.body);
  organisation.save((err, data) => {
    if (err) {
      res.send("Error: " + err);
    }
    res.send(data);
    console.log("Organisation created!");
  });
});

//update monthly goals
router.put("/monthly-goal/update/:id", (req, res) => {
  // if (req.user.isHR || req.user.isAdmin) {
  Organisation.findOneAndUpdate(
    { oId: req.params.id },
    {
      $set: {
        monthlyGoal: req.body.monthlyGoal,
      },
    }
  )
    .then((result) => {
      console.log(result);
      res.json("Successfully added monthly goal.");
    })
    .catch((error) => console.error(error));
  // }

  // else {
  //   return res.json({
  //     data: null,
  //     message: 'You are not authorised. What are you trying to do?'
  //   });
  // }
});

//post notices
router.put("/notices/:id", (req, res) => {
  // if (req.user.isAuth) {
  Organisation.findOneAndUpdate(
    { oId: req.params.id },
    {
      $push: {
        notice: req.body.notice,
      },
    }
  )
    .then((result) => {
      console.log(result);
      res.json("Successfully added a new notice.");
    })
    .catch((error) => console.error(error));
  // }

  // else {
  //   return res.json({
  //     data: null,
  //     message: 'You are not authorised. What are you trying to do?'
  //   });
  // }
});

//get all organisation
router.get("/", async (req, res) => {
  // if (req.user.isAdmin) {
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
  // } else {
  //   return res.json({
  //     data: null,
  //     message: "You are not authorised. What are you trying to do?",
  //   });
  // }
});

//get api for a specific organisation
router.get("/:id", (req, res) => {
  Organisation.findOne({ oId: req.params.id }, (err, result) => {
    //check if organisation exists
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

module.exports = { router, oId };
