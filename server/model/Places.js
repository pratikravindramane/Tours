const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var PlacesSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: { type: String, require: true },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Place", PlacesSchema);
