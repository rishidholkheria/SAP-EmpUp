const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    email:{
        type: String,
        type: String,
        required: [true, 'Admin email required']
    },
    password:{
        type: String,
        required: [true, 'Admin password required']
    },
    oId:{
        type: String
    }
});

var Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;