// studentRoutes.js
const express = require("express");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const { login, register, createPackage, viewPackagesByTour, viewBookingByTour } = require("../controller/Tour");
const router = express.Router();

router.post("/login/", login);
router.post("/register/", register);
router.post("/create-package", authMiddleware, createPackage);
router.get("/view-package/:id", authMiddleware, viewPackagesByTour);
router.get("/view-booking/:id", authMiddleware, viewBookingByTour);

module.exports = router;
