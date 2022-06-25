const bcrypt = require("bcrypt");

exports.execAsync = async (func) =>
  new Promise((resolve, reject) => {
    func.then((data) => resolve({ data })).catch((err) => reject({ err }));
  });

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
