const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  phoneNumber: String,
  emailId: String,
  password: String,
  createdOn: Date,
  modifiedOn: Date,
});

module.exports = mongoose.model("User", schema);
