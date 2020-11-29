const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const Library = require("../schema/Library");
const genId = require("../utils/random");
//const getDate = require("../utils/Date").getDate;
const verify = require("../middlewares/verify");

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

var libId = genId(6);

//lib org id is needed from front end
router.post("/upload-new-book", (req, res) => {
  // if (req.user.isHR || req.user.isAdmin) {
  const libBook = new Library({
    orgId: req.body.organisationId,
    libId: libId,
    date: getDate(),
    name: req.body.bName,
    department: req.body.bDept,
    file: req.body.file,
    description: req.body.bDesc,
  });
  console.log("text api: " + req.body);
  libBook.save((err, data) => {
    if (err) {
      return res.status(400).json({ data: {}, message: err });
    }
    res.status(200).json({
      data: data,
      message: "The file has been created successfully!",
    });
    console.log("created!");
  });
  // }
  // else {
  //     return res.json({
  //         data: null,
  //         message: 'You are not authorised. What are you trying to do?'
  //     });
  // }
});

//get all books/files
router.get("/:orgid", async (req, res) => {
  const library = await Library.find(
    { orgId: req.params.orgid },
    (err, result) => {
      if (!err) {
        return res.status(200).json({
          data: result,
          message: "All books..",
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

//get api for a specific file
router.get("/:id", (req, res) => {
  Library.findOne({ libId: req.params.id }, (err, result) => {
    //check if book exists
    if (!result)
      return res.status(404).json({
        data: {},
        message: "No such book exist. Please check and try again later",
      });

    //if exist and no err
    if (!err) {
      return res.status(200).json({
        data: result,
        message: "Book fetched!",
      });
    } else {
      return res.status(400).json({
        data: {},
        message: "Some unexpected error occurred.",
      });
    }
  });
});

router.delete("/delete/:id", function (req, res) {
  var id = req.params.id;
  Library.deleteOne({ _id: id }, function (err, results) {
    if (err) {
      return res.status(400).send("Error:" + err);
    }
    console.log("Deleted book!");
    return res.status(200).send("Book Deleted!");
  });
});

module.exports = { router, libId };
