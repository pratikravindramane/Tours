const {
  viewTours,
  viewPlaces,
  onePlace,
  changeAdminPassword,
  changeTourPassword,
  changeCollegePassword,
} = require("../controller/all");

const route = require("express").Router();

// routes
route.get("/places", viewPlaces);
route.get("/place/:id", onePlace);
route.get("/tours/:id", viewTours);
route.put("/admin/change-password", changeAdminPassword);
route.put("/tour/change-password", changeTourPassword);
route.put("/college/change-password", changeCollegePassword);

module.exports = route;
