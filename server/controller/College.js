const asyncHandler = require("express-async-handler");
const College = require("../model/College");
const Contact = require("../model/Contact");
const Bookings = require("../model/Bookings");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");
const validateMongoDbId = require("../utils/validateMongoDbId");
// Student controller methods

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const college = await College.findOne({ email });
    if (!college) throw new Error("No college found with this Email");
    const verifyPassword = await bcrypt.compare(password, college.password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(college._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    //update signin
    college.token = token;
    await college.save();
    res.send(college);
  } catch (error) {
    throw new Error(error);
  }
});

// register
const register = asyncHandler(async (req, res) => {
  const { email, password, phone, name, address } = req.body;
  // if college exists
  const college = await College.findOne({ email });
  if (college) throw new Error("college already exist with this email");
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    // create new College
    const newCollege = new College({
      name,
      email,
      phone,
      password: hash,
      address,
    });
    await newCollege.save();
    res.send({ msg: "Successfully Registered", newCollege });
  } catch (error) {
    throw new Error(error);
  }
});

// Function to create a new contact
const createContact = asyncHandler(async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    throw new Error(err);
  }
});

// Function to view college bookings by user ID
const viewCollegeBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const bookings = await Bookings.find({ college: id })
      .populate("place")
      .populate("package")
      .populate("college")
      .populate("tour");
    res.json(bookings);
  } catch (err) {
    throw new Error(err);
  }
});

// Function to create a new booking
const createBooking = asyncHandler(async (req, res) => {
  const { college, tour, package, date, place, amount } = req.body;
  console.log(amount)
  validateMongoDbId(college);
  validateMongoDbId(tour);
  validateMongoDbId(package);

  try {
    // Check if the college is already booked at the same place on the same date
    const existingBooking = await Bookings.findOne({ college, date });
    if (existingBooking) {
      throw new Error(
        "College already booked at the same place on the same date"
      );
    }

    // If not already booked, create the booking
    const booking = new Bookings({
      college,
      tour,
      package,
      date,
      place,
      price:amount,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  login,
  register,
  createContact,
  viewCollegeBooking,
  createBooking,
};
