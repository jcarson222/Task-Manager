const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    // VALIDATORS
    type: String,
    required: [true, "must provide name"],
    trim: true, // gets rid of whitespace
    maxLength: [20, "name must not exceed 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false, // when tasks are entered, they defalut to not complete
  },
});

module.exports = mongoose.model("Task", TaskSchema);
