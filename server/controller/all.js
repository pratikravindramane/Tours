const Tour = require("../model/Tour");
const Places = require("../model/Places");
const Package = require("../model/Package");
const asyncHandler = require("express-async-handler");
const College = require("../model/College");
const Admin = require("../model/Admin");
const bcrypt = require('bcrypt')
const genrateToken = require('../utils/genrateToken')
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

// Change Password
const changeAdminPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) throw new Error("Wrong Email");
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const token = genrateToken(user._id, user.isAdmin);
    user.password = hash;
    user.token = token;
    await user.save();
    res.send(user); // forbidden
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

// Change Password
const changeTourPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Tour.findOne({ email });
    if (!user) throw new Error("No Tour Found With This Email");
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const token = genrateToken(user._id, user.isAdmin);
    user.password = hash;
    user.token = token;
    await user.save();
    res.send(user); // forbidden
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

// Change Password
const changeCollegePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await College.findOne({ email });
    if (!user) throw new Error("No College Found With This Email");
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const token = genrateToken(user._id, user.isAdmin);
    user.password = hash;
    user.token = token;
    await user.save();
    res.send(user); // forbidden
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
module.exports = {
  viewTours,
  viewPlaces,
  onePlace,
  changeAdminPassword,
  changeCollegePassword,
  changeTourPassword,
};
