const { json } = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const XLSX = require("xlsx");
const multer = require("multer");
const genId = require("../utils/random");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Employee = require("../schema/Employee");
const obj = require('../routes/organisation');
console.log(obj.oId);
router.use(express.json());

//connect to DB
const connect = require("../index");

//upload the file
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + ".xlsx");
//   },
// });

// var upload = multer({ storage: storage }).single("file");

// router.post("/upload", function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });

//convert to JSON
const workBook = XLSX.readFile(process.cwd() + "/upload/Employee.xlsx");
var sheet_name_list = workBook.SheetNames;
var jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]], {defval:"",raw:false,dateNF:'dd-mm-yyyy'});

//adding extra properties
var i, length;
length = Object.keys(jsonData).length;
var oId = obj.oId;

console.log(jsonData);


for(i=0;i<length;i++){
    jsonData[i].password = genId(6),
    jsonData[i].image = "",
    jsonData[i].addOn = "",
    jsonData[i].deduction = "",
    jsonData[i].empId = genId(6),
    jsonData[i].oId = oId;
}

console.log(jsonData);



//posting to Database
router.post("/upload-to-db", (req, res) => {
    Employee.insertMany(jsonData);
    res.send("Uploaded!");
    console.log("added!");
});

module.exports = router;
