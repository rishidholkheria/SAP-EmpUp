var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    oId: {
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
    basicSalary: {type: Number},
    addOn: {type: Number},
    deduction: {type: Number}
});
 
var Employee = mongoose.model('Employee', employeeSchema);
 
module.exports = Employee;