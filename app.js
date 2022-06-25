const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const usersRouter = require("./src/routes/users");
const RemindersRouter = require("./src/routes/reminders");

const app = express();
const mongoose = require("mongoose"); // new

// Connect to MongoDB database
const dbURI = process.env.DBURI;
mongoose.connect(dbURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`err: ${err}`);
});
db.on("connected", (err, res) => {
  console.log("Connected to database");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use(RemindersRouter);

app.use(function (req, res, next) {
  res.status(404).send("Url Not Found");
});

app.listen(process.env.PORT, () => {
  console.log(`Started app at port: ${process.env.PORT}`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
