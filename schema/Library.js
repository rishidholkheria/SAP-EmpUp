const mongoose = require("mongoose");

var librarySchema = mongoose.Schema({
  libId: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Name required']
  },
  orgId: {
    type: String,
  },
  department: {
    type: String,
    required: [true, "Department required"]
  },
  file: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: [true, 'Description required']
  },
  date: {
    type: String,
  },
});

var Library = mongoose.model("Library", librarySchema);
module.exports = Library;
