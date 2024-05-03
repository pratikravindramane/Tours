// teacherRoutes.js
const express = require("express");
const {
  login,
  register,
  createContact,
  viewCollegeBooking,
  createBooking,
  createOrder,
} = require("../controller/College");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/login/", login);
router.post("/register/", register);
router.post(
  "/create-order",
createOrder
);
router.post("/create-contact/", authMiddleware, createContact);
router.post("/create-booking/", authMiddleware, createBooking);
router.get("/view-bookings/:id", authMiddleware, viewCollegeBooking);

module.exports = router;
