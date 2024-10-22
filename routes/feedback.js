const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Feedback = require("../schema/Feedback");
//const getDate = require("../utils/Date").getDate;
const genId = require("../utils/random");
router.use(express.json());

function getDate() {
  var d = new Date();
  var month = d.getMonth() + 1;
  // var mins = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
  // var hours = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
  // var date = hours + ':' + mins + ' ' + d.getDate() + '-' + month  + '-' + d.getFullYear();
  var date = d.getDate() + "-" + month + "-" + d.getFullYear();
  return date;
}

router.post("/", (req, res) => {
  console.log(req.body.orgId);
  const feedback = new Feedback({
    feedback: req.body.feedback,
    fTitle: req.body.fTitle,
    fDept: req.body.fDept,
    cDate: getDate(),
    orgId: req.body.orgId,
  });

  feedback.save((err, data) => {
    if (err) {
      return res.status(400).send("Error: " + err);
    }
    res.status(200).send(data);
    console.log("created!");
  });
});

//get all feedback
router.get("/:id", async (req, res) => {
  const feedback = await Feedback.find(
    { orgId: req.params.id },
    (err, result) => {
      if (!err) {
        return res.status(200).json({
          data: result,
          message: "All feedback..",
        });
      } else {
        return res.status(400).json({
          data: {},
          message: "Some error occured..",
        });
      }
    }
  );
});

//get api for a specific feedback
router.get("/single/:id", (req, res) => {
  Feedback.findOne({ _id: req.params.id }, (err, result) => {
    //check if feedback exists
    if (!result)
      return res.status(404).json({
        data: {},
        message: "No such feedback exist. Please check and try again later",
      });

    //if exist and no err
    if (!err) {
      return res.status(200).json({
        data: result,
        message: "Feedback fetched!",
      });
    } else {
      return res.status(400).json({
        data: {},
        message: "Some unexpected error occurred.",
      });
    }
  });
});

module.exports = router;
