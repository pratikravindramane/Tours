import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer";
import "./App.css";
import CreatePackages from "./pages/Tour/CreatePackages";
import TourBookings from "./pages/Tour/TourBookings";
import Packages from "./pages/Tour/Packages";
import CollegeLogin from "./pages/College/CollegeLogin";
import TourLogin from "./pages/Tour/TourLogin";
import AdminLogin from "./pages/Admin/AdminLogin";
import TourRegister from "./pages/Tour/RegisterTour";
import CollegeRegister from "./pages/College/RegisterCollege";
import Colleges from "./pages/Admin/Colleges";
import Contacts from "./pages/Admin/Contacts";
import Tours from "./pages/Admin/Tours";
import CollegeBookings from "./pages/College/CollegeBookings";
import CreateBooking from "./pages/College/CreateBooking";
import AddPlaceForm from "./pages/Admin/CreatePlaces";
import PlacesPage from "./pages/Places";
import ViewPlacePage from "./pages/OnePlace";
const App = () => {
  const { isLoggedIn, role } = useAuth();
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<HomePage />} />
        {/* <Route exact path="/" element={<LoginForm />} /> */}
        <Route exact path="/login" element={<CollegeLogin />} />
        <Route exact path="/college/register" element={<CollegeRegister />} />
        <Route exact path="/tour/login" element={<TourLogin />} />
        <Route exact path="/tour/register" element={<TourRegister />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/aboutus" element={<AboutUsPage />} />
        <Route exact path="/contactus" element={<ContactUsPage />} />
        <Route exact path="/places" element={<PlacesPage />} />
        <Route exact path="/place/:id" element={<ViewPlacePage />} />

        {/* <Route exact path="/signup" element={Sing}>
        <h1>Sign Up Page</h1>
      </Route> */}

        {/* Private Routes */}
        {isLoggedIn && role === "tour" && (
          <>
            <Route path="/create-package" element={<CreatePackages />} />
            <Route path="/tour/bookings/" element={<TourBookings />} />
            <Route path="/tour/packages/" element={<Packages />} />
          </>
        )}
        {isLoggedIn && role === "college" && (
          <>
            <Route path="/college/bookings/" element={<CollegeBookings />} />
            <Route path="/create-booking/" element={<CreateBooking />} />
          </>
        )}
        {isLoggedIn && role === "admin" && (
          <>
            <Route path="/create-place" element={<AddPlaceForm />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/tours" element={<Tours />} />
          </>
        )}
        {/* {isLoggedIn && (
          <>
            <Route path="/view-event" element={<EventList />} />
            <Route path="/view-result" element={<ViewResultPage />} />
            <Route path="/create-team" element={<AddTeamPage />} />
            <Route path="/teams" element={<ViewTeamsPage />} />
            <Route path="/team/:id" element={<ViewTeamPage />} />
          </>
        )} */}

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
