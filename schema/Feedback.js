const mongoose = require("mongoose");

var feedbackSchema = mongoose.Schema({
  fId: mongoose.Schema.Types.ObjectId,
  feedback: {
    type: String,
    required: [true, "Feedback can't be empty!"]
  },
  fTitle: {
    type: String,
    required: [true, "Feedback's title required"]
  },
  fDept: {
    type: String,
    required: [true, 'Department required']
  },
  cDate: {
    type: String,
  },
  orgId: {
    type: String
  }
});

var Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
