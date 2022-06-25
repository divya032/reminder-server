const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  phoneNumber: String,
  email_id: String,
  password: String,
  createdAt: Date,
});

module.exports = mongoose.model("User", schema);
