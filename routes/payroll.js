const express = require("express");
const app = express();
const router = express.Router();
router.use(express.json());
const XLSX = require("xlsx");
const multer = require("multer");
const nodemailer = require("nodemailer");
const genId = require("../utils/random");
const { google } = require("googleapis");

const random = genId(6);
var date = getDate();

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

//upload the file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, `EmpUp_${random}_Payroll_${date}.xlsx`);
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

//sending to frontend

router.get("/data", (req, res) => {
  var jsonData = excelToJson();
  console.log(jsonData);
  res.status(200).json({
    data: jsonData,
    message: "Payroll data sent",
  });
  var newWB = XLSX.utils.book_new();
  newWB.Props = {
    Title: "Payroll",
    Subject: "Payroll",
    Author: "Team EmpUp",
    CreatedDate: new Date(2020, 11, 20),
  };
  var newWS = XLSX.utils.json_to_sheet(jsonData);
  XLSX.utils.book_append_sheet(newWB, newWS, "Payroll");
  XLSX.writeFile(newWB, process.cwd() + `/upload/EmpUp_${random}_Payroll_${date}.xlsx`);
});

// router.get("/data", (req, res) => {
//   var jsonData = excelToJson();
//   console.log(jsonData);
//   res.json({
//     data: jsonData,
//     message: "Payroll data sent",
//   });
// });

//need email of org from front end
router.post("/send-payroll", async (req, res) => {
  if (req.body.email === "") {
    return res.status(400).send("Email can't be empty!!!!!");
  }
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
      // try:{
      from: '"Team EmpUp" <team@EmpUp.com>',
      to: req.body.email,
      subject: "Welcome to EmpUp!",
      html: { path: "welcome/payroll.html" },
      attachments: [
        {
          filename: `EmpUp_${random}_Payroll_${date}.xlsx`,
          path: process.cwd() + `/upload/EmpUp_${random}_Payroll_${date}.xlsx`,
          cid: `uniq-EmpUp_${random}_Payroll_${date}.xlsx`,
        },
      ],
      // },
      // catch(err){
      // res.send("Error: " + err);
      // }
    });
    res.status(200).send("Email to your account sent");
    console.log("Message sent: %s", info.messageId);
  }
  catch (error) {
    return error;
  }
});

const excelToJson = () => {
  //convert to JSON
  const workBook = XLSX.readFile(process.cwd() + `/upload/EmpUp_${random}_Payroll_${date}.xlsx`);
  var sheet_name_list = workBook.SheetNames;
  var jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]], {
    defval: "",
    raw: false,
    dateNF: "dd-mm-yyyy",
  });

  console.log(jsonData);

  //traversing through properties
  var i, length;
  length = Object.keys(jsonData).length;

  for (i = 0; i < length; i++) {
    var b = jsonData[i].Basic;
    var a = jsonData[i].Allowance;
    var it = jsonData[i].IT;
    var sd = jsonData[i].StandardDeduction;
    var pfApt = jsonData[i].PF;

    var basic = parseInt(b);
    var allowance = parseInt(a);
    var IT = parseInt(it);
    var standardDeduction = parseInt(sd);
    var pfAptAll = parseInt(pfApt);

    // console.log(basic);

    //calculation of taxes and net pay
    var grossIncome = basic + allowance;
    console.log(jsonData[i].grossIncome);
    var ESI;
    if (grossIncome < 21000) {
      ESI = 0.0075 * grossIncome;
    } else {
      ESI = 0.0075 * 21000;
    }

    var PF = 0.12 * (basic + pfAptAll);
    var pf;
    if (PF < 15000) {
      pf = PF;
    } else pf = 15000;

    var TDS = (basic + allowance - ESI) * 12 - (IT + standardDeduction);
    // let netIncome = grossIncome-(ESI+TDS+PF);
    var netIncome = grossIncome - ESI;
    var incomeTax = (basic + allowance - ESI) * 12 - IT;

    jsonData[i].grossIncome = grossIncome;
    jsonData[i].incomeTax = incomeTax;
    jsonData[i].netIncome = netIncome;
    jsonData[i].PF = pf;
    (jsonData[i].TDS = TDS), (jsonData[i].ESI = ESI);
  }
  // console.log(jsonData);
  return jsonData;
};

function getDate() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate() + "-" + month + "-" + d.getFullYear();
  return date;
}

module.exports = router;
