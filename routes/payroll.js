const express = require("express");
const app = express();
const router = express.Router();
router.use(express.json());
const XLSX = require("xlsx");
const multer = require("multer");

//upload the file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage }).single("file");

router.post('/upload', function (req, res) {
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
router.get('/data', (req, res) => {
    var jsonData = excelToJson();
    console.log(jsonData);
    res.json({
        json: jsonData,
        message: "Payroll data sent"
    });
    var newWB = XLSX.utils.book_new();
  newWB.Props = {
    Title: "Payroll",
    Subject: "Payroll",
    Author: "Team EmpUp",
    CreatedDate: new Date(2020, 11, 20),
  };
  var newWS = XLSX.utils.json_to_sheet(result);
  XLSX.utils.book_append_sheet(newWB, newWS, "Payroll");
  XLSX.writeFile(newWB, "EmpUp Payroll.xlsx");

});

//need email of org from front end 
router.post("/send-payroll", async (req, res) => {
    //send mail
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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
      to: "samridhikots@gmail.com",
      subject: "Welcome to EmpUp!",
      html: `
      <h2>This month's payroll is here!😊 </h2>
      <h3>Please find below the excel sheet of the payroll having all the details for the same.</h3>
      <h3>Accountable, Adoptable, Affordable. EmpUp!</h3>
  `,
      attachments: [
        {
          filename: "EmpUp Payroll.xlsx",
          path: "EmpUp Payroll.xlsx",
          cid: "uniq-EmpUp Payroll.xlsx",
        },
      ],
    });
  
    res.send("Email to your org sent");
    console.log("Message sent: %s", info.messageId);
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  


const excelToJson = () => {
    //convert to JSON
    const workBook = XLSX.readFile(process.cwd() + "/upload/Payroll.xlsx");
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
        console.log(jsonData[i].grossIncome)
        var ESI;
        if (grossIncome < 21000) {
            ESI = 0.0075 * grossIncome;
        }
        else {
            ESI = 0.0075 * 21000;
        }

        var PF = 0.12 * (basic + pfAptAll);
        var pf;
        if (PF < 15000) {
            pf = PF;
        }
        else pf = 15000;

        var TDS = (basic + allowance - ESI) * 12 - (IT + standardDeduction);
        // let netIncome = grossIncome-(ESI+TDS+PF);
        var netIncome = grossIncome - ESI;
        var incomeTax = (basic + allowance - ESI) * 12 - (IT);

        jsonData[i].grossIncome = grossIncome;
        jsonData[i].incomeTax = incomeTax;
        jsonData[i].netIncome = netIncome;
        jsonData[i].PF = pf;
        jsonData[i].TDS = TDS,
        jsonData[i].ESI = ESI

    }
    // console.log(jsonData);
    return jsonData;
}


module.exports = router;