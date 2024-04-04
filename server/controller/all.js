const Tour = require("../model/Tour");
const Places = require("../model/Places");
const Package = require("../model/Package");
const asyncHandler = require("express-async-handler");

// Function to view all tours by places
const viewTours = asyncHandler(async (req, res) => {
  try {
    const tours = await Tour.find({ places: req.params.id });
    res.json(tours);
  } catch (err) {
    throw new Error(err);
  }
});
// Function to view all places
const viewPlaces = asyncHandler(async (req, res) => {
  try {
    const places = await Places.find();
    res.json(places);
  } catch (err) {
    throw new Error(err);
  }
});
const onePlace = asyncHandler(async (req, res) => {
  try {
    const place = await Places.findById(req.params.id);
    if (!place) throw new Error("No Place Found With This ID");
    const packages = await Package.find({ place: place._id });
    res.send({ place, packages });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  viewTours,
  viewPlaces,
  onePlace,
};
