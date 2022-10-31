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
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
});
module.exports = mongoose.model("TODOs", todoTaskSchema);
