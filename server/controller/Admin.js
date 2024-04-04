const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Bookings = require("../model/Bookings");
const Package = require("../model/Package");
const College = require("../model/College");
const Tour = require("../model/Tour");
const Contact = require("../model/Contact");
const Places = require("../model/Places");
const Admin = require("../model/Admin");
const genrateToken = require("../utils/genrateToken");
// admin login
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const admin = await Admin.findOne({ email });
    if (!admin) throw new Error("No admin found with this Email");
    const verifyPassword = bcrypt.compare(admin.password, password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(admin.id);
    // give token
    admin.token = token;
    admin.save();
    res.send(admin);
  } catch (error) {
    throw new Error(error);
  }
});
// register
const register = asyncHandler(async (req, res) => {
  const { email, password, phone, name, address } = req.body;
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    // create new College
    const admin = new Admin({
      name,
      email,
      phone,
      password: hash,
    });
    await admin.save();
    res.send({ msg: "Successfully Registered", admin });
  } catch (error) {
    throw new Error(error);
  }
});
const createPlace = async (req, res) => {
  const { location } = req.body;
  try {
    let imgPath = "";
    if (req.file) {
      imgPath = req.file.filename;
    }
    const place = new Places({
      location,
      image: imgPath,
      address
    });
    await place.save();
    res.status(201).json(place);
  } catch (err) {
    throw new Error(err);
  }
};

// Function to view all contacts
const viewContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    throw new Error(err);
  }
};

// Function to view all payments
const viewBookings = async (req, res) => {
  try {
    const payments = await Bookings.find({});
    res.json(payments);
  } catch (err) {
    throw new Error(err);
  }
};

// Function to view all packages
const viewPackages = async (req, res) => {
  try {
    const packages = await Package.find({});
    res.json(packages);
  } catch (err) {
    throw new Error(err);
  }
};

// Function to view all colleges
const viewColleges = async (req, res) => {
  try {
    const colleges = await College.find({});
    res.json(colleges);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createPlace,
  viewBookings,
  viewColleges,
  viewPackages,
  viewContact,
  adminLogin,
  register,
};
