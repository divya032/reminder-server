const {
  createReminder,
  fetchRemindersByUserId,
  updateReminder,
  deleteReminder,
} = require("../dao/reminderDaos");
const error = require("../errors/codes");

exports.postReminder = async (req, res) => {
  try {
    const { sendTime, title, message } = req.body;
    const { userId } = req.params;

    if (!title || !message || !sendTime) {
      return res.status(400).send(error.InvalidRequestBody);
    }

    const sentDateTime = new Date(sendTime);

    if (sentDateTime < new Date()) {
      return res.status(400).send(error.InvalidsendTime);
    }

    const { data, err: err1 } = await createReminder({
      title,
      message,
      sendTime: sentDateTime,
      userId,
      status: "CREATED",
      createdOn: new Date(),
    });

    if (err1) {
      return res.status(500).send(error.DatabaseError);
    }

    return res.status(201).send({
      data: {
        reminder: {
          id: data.id,
        },
      },
    });
  } catch (err) {
    return res.status(500).send(error.InternalServerError);
  }
};

exports.getReminders = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: reminders, err: err1 } = await fetchRemindersByUserId({
      searchFilter: { userId },
    });

    if (err1) {
      return res.status(500).send(error.DatabaseError);
    }

    return res.status(200).send({
      data: {
        reminders,
      },
    });
  } catch (err) {
    return res.status(500).send(error.InternalServerError);
  }
};

exports.patchReminder = async (req, res) => {
  try {
    const { sendTime } = req.body;
    const { reminderId } = req.params;

    let newData = {};

    if (sendTime) {
      const sentDateTime = new Date(sendTime);

      if (sentDateTime < new Date()) {
        return res.status(400).send(error.InvalidsendTime);
      }
      newData.sendTime = sentDateTime;
    }

    newData = { ...newData, ...req.body, modifiedOn: new Date() };

    const { data, err: err1 } = await updateReminder({
      searchFilter: {
        _id: reminderId,
      },
      newData,
    });

    if (err1) {
      return res.status(500).send(error.DatabaseError);
    }

    return res.status(200).send({
      data: {
        reminder: {
          data,
        },
      },
    });
  } catch (err) {
    return res.status(500).send(error.InternalServerError);
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;

    const { err: err1 } = await deleteReminder({
      searchFilter: {
        _id: reminderId,
      },
    });

    if (err1) {
      return res.status(500).send(error.DatabaseError);
    }

    return res.status(200).send({
      data: {
        message: "Deletion Successful",
      },
    });
  } catch (err) {
    return res.status(500).send(error.InternalServerError);
  }
};
