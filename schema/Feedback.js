const mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
    fId:  mongoose.Schema.Types.ObjectId,
    feedback: {
        type: String
    },
    complaineeName:{
        type: String
    },
    complaineeEmail:{
        type: String
    },
    complaineeDept:{
        type: String
    },
    complaineeDesig:{
        type: String
    },
    cDate:{
        type: String
    }
});

var Feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = Feedback;