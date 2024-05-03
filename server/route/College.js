// teacherRoutes.js
const express = require("express");
const {
  login,
  register,
  createContact,
  viewCollegeBooking,
  createBooking,
} = require("../controller/College");
const { authMiddleware } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");
const Bookings = require("../model/Bookings");
const router = express.Router();


router.post("/login/", login);
router.post("/register/", register);
router.post(
  "/create-order",

);
router.post("/create-contact/", authMiddleware, createContact);
router.post("/create-booking/", authMiddleware, createBooking);
router.get("/view-bookings/:id", authMiddleware, viewCollegeBooking);

module.exports = router;
