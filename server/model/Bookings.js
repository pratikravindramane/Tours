const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    place:{
      type: Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    date: { type: String, require: true },
    time: { type: String, require: true },
    price: { type: Number, require: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Booking", BookingSchema);
