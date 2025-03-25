const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema(
  {
    task: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);
const Task = mongoose.model("tasks", TaskSchema);
module.exports = Task;
