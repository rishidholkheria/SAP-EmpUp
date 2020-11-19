const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox71c777ca587745dca57246a9516043d2.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const Employee = require('../schema/Employee');
const Admin = require('../schema/Admin');
const dotenv = require('dotenv');
const verify = require('../middlewares/verify');
dotenv.config();


//login
router.post('/login', async (req, res) => {
    let payload = {};
    let token = '';

    //employee login
    const employee = await Employee.findOne({ email: req.body.email });
    if (!employee) return res.status(404).json({
        accessToken: null,
        message: 'User does not exist'
    });

    //cheking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, employee.password);
    if (!validPassword) return res.status(400).json({
        accessToken: null,
        message: 'Wrong Credentials'
    });

    //checking if HR or employee
    if (employee.type == 'HR') {
        payload = {
            isAdmin: false,
            userid: employee._id,
            isHR: true
        };
    }
    else {
        payload = {
            isAdmin: false,
            userid: employee._id,
            isHR: false
        };
    }

    //create and assign a token
    token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7200s' });
    res.json({
        accessToken: token,
        message: "Successfully logged in!"
    });
});


//forgot password
router.put('/forgot-password', async (req, res) => {
    var email = req.body.email;
    await Employee.findOne({ email }, (err, employee) => {
        if (err || !employee) return res.status(400).json({
            accessToken: null,
            message: 'User does not exist'
        });

        payload = {
            userid: employee.empId,
            email: employee.email
        };

        token = jwt.sign(payload, process.env.RESET_PASSWORD_KEY, { expiresIn: '1200s' });
        const data = {
            from: 'noreply@empUp.com',
            to: email,
            subject: 'Password Reset Link EmpUp',
            html: `
                <h2>Please click on the given link to reset your password</h2>
                <href>${process.env.CLIENT_URL}/resetpassword/${token}</href>
            `
        };

        return employee.updateOne({ resetLink: token }, (err, success) => {
            if (err) return res.status(400).json({
                accessToken: null,
                message: 'Reset password link error'
            });
            else {
                mg.messages().send(data, (error, body) => {
                    if (error) return res.json({
                        error: "Some unexpected error occured!"
                    });
                    console.log(body);
                    return res.json({ message: 'Email has been sent. Kidnly follow the instructions' });
                });
            }

        });


    });
});

//reset password
router.put('/reset-password', (req, res) => {
    const { resetLink, newPassword } = req.body;
    const salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(newPassword, salt);

    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {
            if (err) {
                return res.status(401).json({
                    error: 'Incorrect token or session expired.'
                });
            }
            Employee.findOne({ resetLink }, (err, employee) => {
                if (err || !employee) return res.status(400).json({
                    accessToken: null,
                    message: 'User with this token does not exist.'
                });
                const obj = {
                    password: hashedPassword
                }

                employee = _.extend(employee, obj);
                employee.save((err, result) => {
                    if (err) return res.status(400).json({
                        accessToken: null,
                        message: 'Reset password error'
                    });
                    else {
                        return res.status(200).json({ message: 'Your password has been successfully changed' });
                    }
                });


            });
        });
    }
    else {
        return res.status(401).json({
            accessToken: null,
            message: 'Authentication error'
        });

    }
});

//get all employees
router.get('/all-employees', verify, async (req, res) => {
    if (req.user.isHR || req.user.isAdmin) {
        const employees = await Employee.find({}, (err, employees) => {
            if (!err) {
                res.json({
                    data: employees,
                    message: "All employees.."
                });
            }
            else {
                res.status(500).json({
                    data: {},
                    message: "Some error occured.."
                });
            }
        });
    } else {
        return res.json({
            data: null,
            message: 'You are not authorised. What are you trying to do?'
        });
    }
});

router.get('/:id', verify, async (req, res) => {
    if (req.user.isAdmin || req.user.isHR) {
        Employee.findOne({ empId: req.params.id }, (err, employee) => {
            if (err) return res.status(500).json({
                data: {},
                message: 'Some unexpected error occurred.'
            });
            //if exist and no err
            if (!employee) {
                return res.status(404).json({
                    data: {},
                    message: 'No such employee exist. Please check and try again. :)'
                });
            }
            else {
                res.json({
                    data: employee,
                    message: "Employee fetched!"
                });
            }
        });
    } else {
        return res.json({
            data: null,
            message: 'You are not authorised. What are you trying to do?'
        });
    }
});

// //update employee
// router.put('/update/empId',(req,res)=>{
//     Employee.findOne({empId: req.params.empId}, function (err, employee){
//         if (err) {
//            res.send(422,'update failed');
//         } else {
//            //update fields
//            for (var field in Employee.schema.paths) {
//               if ((field !== '_id') && (field !== '__v')) {
//                  if (req.body[field] !== undefined) {
//                     employee[field] = req.body[field];
//                  }  
//               }  
//            }  
//            employee.save();
//         }
//      });
// });

//update employee
router.put('/update/:empId', verify, async (req, res) => {

    await Employee.findOneAndUpdate(
        { empId: req.params.empId },
        {
            $set: {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                designation: req.body.designation,
                department: req.body.department,
                type: req.body.type,
                basicSalary: req.body.basicSalary,
                addOn: req.body.addOn,
                deduction: req.body.addOn
            }
        },
        // {
        //     upsert: true
        // }
    ).then(result => {
        console.log(result);
        res.json('Success');
    })
        .catch(error => console.error(error));
});


module.exports = router;

// AQ67te
// crX9Sn
// hqBRZy
// 9a1yi6
// C5kUZQ
// F3zM9b