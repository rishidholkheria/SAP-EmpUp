const { json } = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const XLSX = require("xlsx");
const multer = require("multer");
const genId = require("../utils/random");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { google } = require("googleapis");

const Employee = require("../schema/Employee");
const objOrg = require("../routes/organisation");
dotenv.config();

console.log(objOrg.oId);
router.use(express.json());

//setup google oauth
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_ID = process.env.EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

var date = getDate();
// var time = moment().format('h:mm a');

//upload the file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    const name = `${objOrg.oId}_EmpUp_Employee_${date}.xlsx`;
    console.log(name);
    cb(null, name);
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

//posting to Database
router.post("/upload-to-db", (req, res) => {
  var jsonData = excelToJson();
  // console.log(jsonData);
  Employee.insertMany(jsonData);
  res.send("Employees of your organisation has been added successfully!");
  let result = jsonData.map(
    ({ email, pass, name, department, designation }) => ({
      email,
      pass,
      name,
      department,
      designation,
    })
  );
  // console.log(result);

  var newWB = XLSX.utils.book_new();
  newWB.Props = {
    Title: "EmpUp Employee Credentitals",
    Subject: "Login Credentials",
    Author: "Team EmpUp",
    CreatedDate: new Date(2020, 11, 20),
  };
  var newWS = XLSX.utils.json_to_sheet(result);
  XLSX.utils.book_append_sheet(newWB, newWS, "Login credentials");
  XLSX.writeFile(
    newWB,
    process.cwd() +
    `/upload/${objOrg.oId}_EmpUp_Employee_${date}_Credentials.xlsx`
  );

  console.log("employees added!");
});

//need email of org from front end
router.post("/send-password-to-organisation", async (req, res) => {

  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_ID,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Team EmpUp" <team@EmpUp.com>',
      to: req.body.orgEmail,
      subject: "Welcome to EmpUp!",
      html: { path: "welcome/welcome.html" },
      attachments: [
        {
          filename: `${objOrg.oId}_EmpUp_Employee_${date}_Credentials.xlsx`,
          path:
            process.cwd() +
            `/upload/${objOrg.oId}_EmpUp_Employee_${date}_Credentials.xlsx`,
          cid: `uniq-${objOrg.oId}_EmpUp_Employee_${date}_Credentials.xlsx`,
        },
      ]
    });
    res.send("Email to your org sent");
    console.log("Message sent: %s", info.messageId);
  }
  catch (error) {
    return error;
  }
});

const excelToJson = () => {
  //convert to JSON
  const workBook = XLSX.readFile(
    process.cwd() + `/upload/${objOrg.oId}_EmpUp_Employee_${date}.xlsx`
  );
  var sheet_name_list = workBook.SheetNames;
  var jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]], {
    defval: "",
    raw: false,
    dateNF: "dd-mm-yyyy",
  });

  //adding extra properties
  var i, length;
  length = Object.keys(jsonData).length;
  var oId = objOrg.oId;
  // console.log(jsonData);

  const salt = bcrypt.genSaltSync(10);

  for (i = 0; i < length; i++) {
    var password = `emp-${oId}-${i}`;
    var hashedPassword = bcrypt.hashSync(password, salt);
    (jsonData[i].password = hashedPassword),
      // (jsonData[i].image = ""),
      // (jsonData[i].addOn = ""),
      // (jsonData[i].deduction = ""),
      (jsonData[i].empId = i.toString()),
      (jsonData[i].orgId = oId),
      (jsonData[i].pass = password);
  }
  return jsonData;
};

function getDate() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate() + "-" + month + "-" + d.getFullYear();
  return date;
}

module.exports = router;
