const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  message: String,
  reminderTime: Date,
  userId: String,
  createdOn: Date,
  modifiedOn: Date,
  status: String,
});

module.exports = mongoose.model("Reminder", schema);
