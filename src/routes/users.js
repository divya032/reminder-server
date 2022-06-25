var express = require("express");
var router = express.Router();
const { postUser } = require("../handlers/userHandler");

router.post("/user", postUser);

// /* GET users listing. */
// router.get("/users/:id", getUserHandler);
module.exports = router;
