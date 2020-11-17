const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type: String
    },
    oId:{
        type: String
    }
});

var Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;