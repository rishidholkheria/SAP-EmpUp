const mongoose = require('mongoose');

var motivationSchema = mongoose.Schema({
    mId: mongoose.Schema.Types.ObjectId,
    motivation: {
        type: String
    },
    date: {
        type: String
    }
});

var Motivation = mongoose.model('Motivation',motivationSchema);
module.exports = Motivation;