const mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
    oId: String,
    orgName:{
        type: String
    },
    orgLocation:{
        type: String
    },
    orgType:{
        type: String
    },
    orgEmail:{
        type: String
    },
    orgWebsite:{
        type: String
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
