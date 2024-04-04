const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var PackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      require: true,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      require: true,
    },
    price: { type: Number, require: true },
    duration: { type: Number, require: true },
    startPoint: { type: String, require: true },
  },
  { timestamps:true }
);

//Export the model
module.exports = mongoose.model("Package", PackageSchema);
