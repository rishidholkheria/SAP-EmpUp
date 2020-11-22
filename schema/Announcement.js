var mongoose = require('mongoose');

var announcementSchema = mongoose.Schema({
    aId: {
        type: String
    },
    aText: {
        type: String
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