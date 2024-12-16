const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: {
    type: String,
    enum: [
      "Pending",
      "In-Progress",
      "Completed",
    ],
    trim: true,
    default: "Pending",
  },
  dueDate: { type: Date },
}, { timestamps: true });   

module.exports = mongoose.model("Tasks", TaskSchema);