const mongoose = require('mongoose');

var librarySchema = mongoose.Schema({
    libId: {
        type: String
    },
    name: {
        type: String
    },
    department: {
        type: String
    },
    file: {
        type: String,
        default: ""
    },
    description:{
        type: String
    }
});

var Library = mongoose.model('Library',librarySchema);
module.exports = Library;