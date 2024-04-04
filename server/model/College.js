const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: { type: String, require: true },
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("College", CollegeSchema);
