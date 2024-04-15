// teacherRoutes.js
const express = require("express");
const Razorpay = require("razorpay");
const {
  login,
  register,
  createContact,
  viewCollegeBooking,
  createBooking,
} = require("../controller/College");
const { authMiddleware } = require("../middleware/authMiddleware");
const expressAsyncHandler = require("express-async-handler");
const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRECT,
});

router.post("/login/", login);
router.post("/register/", register);
router.post(
  "/create-order",
  expressAsyncHandler(async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1,
      };

      // Create an order using Razorpay instance
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  })
);
router.post("/create-contact/", authMiddleware, createContact);
router.post("/create-booking/", authMiddleware, createBooking);
router.get("/view-bookings/:id", authMiddleware, viewCollegeBooking);

module.exports = router;
