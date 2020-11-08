const mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
    oId: mongoose.Schema.Types.ObjectId,
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
    orgContact:{
        type: String
    },
    orgWebsite:{
        type: String
    }
});

var Organisation = mongoose.model('Organisation',orgSchema);
module.exports = Organisation;
