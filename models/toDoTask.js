const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("TODOs", todoTaskSchema);
