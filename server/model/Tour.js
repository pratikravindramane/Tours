const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

const TourSchema = new Schema(
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
    packages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    }],
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tour", TourSchema);
