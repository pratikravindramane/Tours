const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { viewTours, viewPlaces, onePlace } = require("../controller/all");

const route = require("express").Router();

// routes
route.get("/places", viewPlaces);
route.get("/place/:id", onePlace);
route.get("/tours/:id", viewTours);

module.exports = route;
