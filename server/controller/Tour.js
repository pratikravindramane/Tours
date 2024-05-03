const asyncHandler = require("express-async-handler");
const Tour = require("../model/Tour");
const Package = require("../model/Package");
const Bookings = require("../model/Bookings");
const validateMongoDbId = require("../utils/validateMongoDbId");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");
// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const tour = await Tour.findOne({ email });
    if (!tour) throw new Error("No tour found with this Email");
    const verifyPassword = await bcrypt.compare(password, tour.password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(tour._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    //update signin
    tour.token = token;
    await tour.save();
    res.send(tour);
  } catch (error) {
    throw new Error(error);
  }
});

// register
const register = asyncHandler(async (req, res) => {
  const { email, password, phone, name } = req.body;
  // if tour exists
  const tour = await Tour.findOne({ email });
  if (tour) throw new Error("tour already exist with this email");
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    // create new Tour
    const newTour = new Tour({
      name,
      email,
      phone,
      password: hash,
    });
    await newTour.save();
    res.send({ msg: "Successfully Registered", newTour });
  } catch (error) {
    throw new Error(error);
  }
});

// Function to create a new package
const createPackage = asyncHandler(async (req, res) => {
  const { train, bus, airline } = req.body;
  try {
    const package = new Package({
      ...req.body,
      mode: { train, bus, airline },
    });
    await package.save();
    res.status(201).json(package);
  } catch (err) {
    throw new Error(err);
  }
});

// Function to view packages by tour ID
const viewPackagesByTour = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const packages = await Package.find({ tour: id })
      .populate("place")
      .populate("tour");
    res.json(packages);
  } catch (err) {
    throw new Error(err);
  }
});

// Function to view bookings by tour ID
const viewBookingByTour = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const bookings = await Bookings.find({ tour: id })
      .populate("place")
      .populate("package")
      .populate("college")
      .populate("tour");
    res.json(bookings);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  login,
  register,
  viewBookingByTour,
  viewPackagesByTour,
  createPackage,
};
