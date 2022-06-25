const Reminder = require("../models/reminder.model");
const { execAsync } = require("../utils/helper");

exports.createReminder = async (reminderDetail) => {
  const reminder = new Reminder(reminderDetail);
  return execAsync(reminder.save());
};

exports.fetchRemindersByUserId = async ({ searchFilter }) => {
  console.log(searchFilter);
  return execAsync(Reminder.find(searchFilter));
};

exports.updateReminder = async ({ searchFilter, newData }) => {
  return execAsync(
    Reminder.findOneAndUpdate(
      searchFilter,
      {
        $set: newData,
      },
      { new: true, useFindAndModify: false }
    )
  );
};

exports.deleteReminder = async ({ searchFilter }) => {
  return execAsync(Reminder.deleteOne(searchFilter));
};
