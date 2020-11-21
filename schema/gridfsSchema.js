const mongoose = require('mongoose');

var GridfsSchema = new mongoose.Schema({
    filename: String
}, {strict: false});

module.exports = mongoose.model('GridFs', GridfsSchema, 'uploaded_images.files' );