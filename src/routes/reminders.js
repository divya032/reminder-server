const express = require("express");
const router = express.Router();
const {
  postReminder,
  getReminders,
  patchReminder,
  deleteReminder,
} = require("../handlers/reminderHandler");
const { checkIfUserExists } = require("../middlewares/checkIfUserExists");

router.post("/users/:userId/reminder", checkIfUserExists, postReminder);
router.get("/users/:userId/reminder", checkIfUserExists, getReminders);
router.patch(
  "/users/:userId/reminder/:reminderId",
  checkIfUserExists,
  patchReminder
);
router.delete(
  "/users/:userId/reminder/:reminderId",
  checkIfUserExists,
  deleteReminder
);

module.exports = router;
