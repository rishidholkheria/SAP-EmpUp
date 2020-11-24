var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    orgId: {
        type: String
    },
    empId: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    name: {
            type: String
    },
    designation: {type: String},
    image: {type: String},
    department: {type: String},
    type: {type: String},
    basicSalary: {type: Number},
    addOn: {type: Number},
    deduction: {type: Number},
    resetLink: {
        data: String,
        default: ''
    }
});
 
var Employee = mongoose.model('Employee', employeeSchema);
 
module.exports = Employee;