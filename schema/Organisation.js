const mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
    oId: String,
    orgName:{
        type: String,
        required: [true, 'Organisation name required!']
    },
    orgLocation:{
        type: String,
        required: [true, 'Organisation location required!']
    },
    orgType:{
        type: String
    },
    orgEmail:{
        type: String,
        required: [true, 'Organisation email required!!']
    },
    orgContact:{
        type: String,
        required: [true, 'Organisation contact required']
    },
    monthlyGoal:{
        type: String,
        default: ""
    },
    notice: {
        type: [String],
        default:[""]
    }
});

var Organisation = mongoose.model('Organisation',orgSchema);
module.exports = Organisation;
