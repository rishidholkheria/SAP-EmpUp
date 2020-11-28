var mongoose = require('mongoose');

var announcementSchema = mongoose.Schema({
    aId: {
        type: String
    },
    aText: {
        type: String,
        required: [true, "Announcement's text can't be empty!"]
    },
    aImage: {
        type: String,
        default: ""
    },
    aDate: {
        type: String
    },
    orgId:{
        type: String,
        default: ""
    }
});

var Announcement = mongoose.model('Announcement', announcementSchema);
 
module.exports = Announcement;