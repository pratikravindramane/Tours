const {
  createPlace,
  viewContact,
  viewBookings,
  viewColleges,
  viewPackages,
  adminLogin,
  register,
  viewTour,
  deletePlace,
} = require("../controller/Admin");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = require("express").Router();
const { upload } = require("../utils/uploadImg");
// Admin routes
router.post("/login", adminLogin);
router.post(
  "/create-place",
  upload.single("image"),
  authMiddleware,
  isAdmin,
  createPlace
);
router.post("/create-place", authMiddleware, isAdmin, createPlace);
router.post("/register", register);
router.get("/view-contacts", authMiddleware, isAdmin, viewContact);
router.get("/view-tours", authMiddleware, isAdmin, viewTour);
router.get("/view-bookings", authMiddleware, isAdmin, viewBookings);
router.get("/view-colleges", authMiddleware, isAdmin, viewColleges);
router.get("/view-packages", authMiddleware, isAdmin, viewPackages);
router.delete("/delete/place/:id", authMiddleware, isAdmin, deletePlace);

module.exports = router;
