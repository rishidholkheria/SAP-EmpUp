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
        type: Buffer
    },
    fileType: {
        type: String
    },
    description:{
        type: String
    }
});

var Library = mongoose.model('Library',librarySchema);
module.exports = Library;