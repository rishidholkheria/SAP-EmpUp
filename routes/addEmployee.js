const { json } = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const XLSX = require("xlsx");
const multer = require("multer");
const genId = require("../utils/random");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const Employee = require("../schema/Employee");
const objOrg = require('../routes/organisation');
dotenv.config();

console.log(objOrg.oId);
router.use(express.json());

//connect to DB
const connect = require("../index");

//upload the file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ".xlsx");
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

//convert to JSON
const workBook = XLSX.readFile(process.cwd() + "/upload/Employee.xlsx");
var sheet_name_list = workBook.SheetNames;
var jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]], { defval: "", raw: false, dateNF: 'dd-mm-yyyy' });

//adding extra properties
var i, length;
length = Object.keys(jsonData).length;
var oId = objOrg.oId;

// console.log(jsonData);

const salt = bcrypt.genSaltSync(10);

for (i = 0; i < length; i++) {
  var password = genId(6);
  console.log(password);
  var hashedPassword = bcrypt.hashSync(password, salt);
  jsonData[i].password = hashedPassword,
    jsonData[i].image = "",
    jsonData[i].addOn = "",
    jsonData[i].deduction = "",
    jsonData[i].empId = genId(6),
    jsonData[i].oId = oId,
    jsonData[i].pass = password
}

console.log(jsonData);



//posting to Database
router.post("/upload-to-db", (req, res) => {
  Employee.insertMany(jsonData);
  res.send("Employees uploaded!");
  console.log("added!");
});


router.post("/send-password-to-organisation", async (req, res) => {

  let result = jsonData.map(({ email, pass, name, department, designation }) => ({ email, pass, name, department, designation }));
  console.log(result)

  var newWB = XLSX.utils.book_new();
  newWB.Props = {
    Title: "EmpUp Employee Credentitals",
    Subject: "Login Credentials",
    Author: "Team EmpUp",
    CreatedDate: new Date(2020, 11, 20)
  };
  var newWS = XLSX.utils.json_to_sheet(result)
  XLSX.utils.book_append_sheet(newWB, newWS, "Login credentials")
  XLSX.writeFile(newWB, "EmpUp Employee Credentials.xlsx")

  //send mail
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Team EmpUp" <team@EmpUp.com>',
    to: req.body.email,
    subject: "Welcome to EmpUp!",
    html: `
    <h2>We are glad to have you on board.😊 </h2>
    <h3>Please find below the excel sheet of the employees' credentials. Use them to login to EmpUp</h3>
    <h3>Accountable, Adoptable, Affordable. EmpUp!</h3>
`,
    attachments: [
      {
        filename: 'EmpUp Employee Credentials.xlsx',
        path: 'EmpUp Employee Credentials.xlsx',
        cid: 'uniq-EmpUpEmployeeCredentials.xlsx'
      }
    ]
  });

  res.send("Message sent")
  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

module.exports = router;
