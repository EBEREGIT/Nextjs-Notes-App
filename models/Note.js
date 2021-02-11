const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a Title"],
    unique: true,
    trim: true,
    maxlength: [40, "Title cannont be more than 40 characters"],
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, "Description cannont be more than 200 characters"],
  },
});

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
