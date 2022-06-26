const { postUser } = require("../dao/userDaos");
const error = require("../errors/codes");
const { hashPassword } = require("../utils/helper");

exports.postUser = async (req, res) => {
  try {
    const { emailId, password, phoneNumber, name } = req.body;
    if (!emailId || !password || !phoneNumber) {
      return res.status(400).send(error.InvalidRequestBody);
    }

    let hash = await hashPassword(password);

    const userDetail = {
      name,
      emailId,
      phoneNumber,
      password: hash,
      createdOn: new Date(),
    };

    const { data, err } = await postUser(userDetail);

    if (err) {
      return res.status(500).send(error.DatabaseError);
    }

    return res.status(201).send({
      data: {
        user: {
          id: data.id,
        },
      },
    });
  } catch (err) {
    return res.status(500).send(error.InternalServerError);
  }
};
