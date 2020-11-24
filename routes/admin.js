const express = require("express");
const app = express();
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const obj = require("../routes/organisation");
const Employee = require("../schema/Employee");

router.use(express.json());
dotenv.config();

router.post("/", (req, res) => {
  var password = req.body.adminPassword;
  const salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);

  const admin = new Employee({
    email: req.body.adminEmail,
    password: hashedPassword,
    orgId: obj.oId,
    type: 'Admin'
  });

  admin.save((err, data) => {
    if (err) {
      res.send("Error: " + err);
    }
    res.send(data);
    console.log("Admin created!");
  });
});

// //admin login
// router.post("/login", async (req, res) => {
//   let payload = {};
//   let token = "";
//   let password = req.body.password;
//   let email = req.body.email;

//   //developer admin login

//   if (
//     req.body.adminEmail == process.env.DEV_ADMIN_EMAIL &&
//     req.body.adminPassword == process.env.DEV_ADMIN_PASSWORD
//   ) {
//     payload = {
//       // isAdmin: true,
//       userid: "TwinTech",
//       isAuthorized: true,
//       // orgId: admin.oId
//     };
//     token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
//       expiresIn: "3600s",
//     });
//     return res.json({
//       accessToken: token,
//       message: "Logged in as developer admin",
//       payload
//     });
//   }

//   //org admin login

//   const admin = await Employee.findOne({ email: req.body.adminEmail });
//   if (!admin)
//     return res.status(404).json({
//       accessToken: null,
//       message: "Enter the correct credentials!",
//     });

//   //cheking if password is correct
//   const validPassword = await bcrypt.compare(req.body.adminPassword, admin.password);
//   if (!validPassword)
//     return res.status(400).json({
//       accessToken: null,
//       message: "Wrong Credentials",
//     });

//   payload = {
//     isAuthorized: true,
//     userid: admin._id,
//     orgId: admin.oId
//   };

//   token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
//     expiresIn: "3600s",
//   });
//   return res.json({
//     accessToken: token,
//     message: "Logged in as admin",
//     payload
//   });
// });

module.exports = router;
