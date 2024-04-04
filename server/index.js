const express = require("express");
const cors = require("cors");
const coookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
app.use("/public", express.static("public"));
// Connect MongoDB.
const connect = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("connected to database");
  } catch (error) {
    throw new Error(error);
  }
};

// middlewares
app.use(cors());
app.use(express.json());
app.use(coookieParser());
// routes
app.use("/", require("./route/all"));
app.use("/admin", require("./route/Admin"));
app.use("/tour", require("./route/Tour"));
app.use("/college", require("./route/College"));
app.use(errorHandler);

// running on port
app.listen(process.env.PORT, () => {
  console.log(`connected to server at port ${process.env.PORT}`);
  connect();
});
