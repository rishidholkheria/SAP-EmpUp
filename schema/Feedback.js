const mongoose = require("mongoose");

var feedbackSchema = mongoose.Schema({
  fId: mongoose.Schema.Types.ObjectId,
  feedback: {
    type: String,
  },
  fTitle: {
    type: String,
  },
  fDept: {
    type: String,
  },
  cDate: {
    type: String,
  }
});

var Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
