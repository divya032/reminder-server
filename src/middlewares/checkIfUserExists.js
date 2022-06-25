const { getUser } = require("../dao/userDaos");

exports.checkIfUserExists = async (req, res, next) => {
  const { userId } = req.params;

  const { data: user, err } = await getUser({
    searchFilter: {
      _id: userId,
    },
  });

  if (err) {
    return res.status(500).send(error.DatabaseError);
  }

  if (!user) {
    return res.status(400).send(error.UserDoesNotExists);
  }
  next();
};
