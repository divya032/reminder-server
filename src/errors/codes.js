module.exports = {
  InternalServerError: {
    code: "Internal Server Error",
    message: "Something went wrong",
  },
  DatabaseError: {
    code: "Database Error",
    message: "Unexpected error with datbase",
  },
  InvalidRequestBody: {
    code: "Invalid Request Data",
    message: "Missing required fields",
  },
  InvalidSenDTime: {
    code: "Invalid Request Data",
    message: "SendTime should be greater than current Date-time",
  },
  UserDoesNotExists: {
    code: "Invalid Request",
    message: "User Does Not Exists",
  },
};
