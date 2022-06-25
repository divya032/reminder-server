const User = require("../models/user.model");
const { execAsync } = require("../utils/helper");

exports.postUser = async (userDetail) => {
  const user = new User(userDetail);
  return execAsync(user.save());
};
exports.getUser = async ({ searchFilter }) => {
  return execAsync(User.find(searchFilter));
};
