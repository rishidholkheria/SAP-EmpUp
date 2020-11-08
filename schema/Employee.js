var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    empId: {
        type: String,
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    name: {
            type: String
        // lastName: String
        // validate: {
        //     validator: function(text){
        //         if(text==null && text.length > 1)
        //             return;
        //         return true;    
        //     },
        //     message: 'Name must be entered in order to continue.'
        // }
    },
    designation: {type: String},
    image: {type: String},
    department: {type: String},
    type: {type: String},
    dateOfJoin: {type: String},
    basicSalary: {type: Number},
    monthlyGoal: {type: String},
    todo: {type: String},
    addOn: {type: Number},
    deduction: {type: Number}
});
 
var Employee = mongoose.model('Employee', employeeSchema);
 
module.exports = Employee;