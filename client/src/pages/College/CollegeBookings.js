import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../../config";
// import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CollegeBookings = () => {
  const [bookings, setCollegeBookings] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      try {
        const response = await axios.get(
          `${backendLocation}/college/view-bookings/${decode.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setCollegeBookings(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container mt-5 view-height">
      {serverError && (
        <>
          <div className="error-div">
            <p>{serverError}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setServerError(false);
              }}
              className="btn btn-danger"
            >
              ok
            </button>
          </div>
        </>
      )}
      <h1 className="mb-4">View College Bookings</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Tour</th>
              <th>Place</th>
              <th>Package</th>
              <th>Starts From</th>
              <th>Duration</th>
              <th>Mode</th>
              <th>Peoples</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking?.tour?.name}</td>
                <td>{booking?.place?.location}</td>
                <td>{booking?.package?.name}</td>
                <td>{booking?.package?.startPoint}</td>
                <td>{booking?.package?.duration}</td>
                <td>{booking?.mode}</td>
                <td>{booking?.peoples}</td>
                <td>{booking?.date}</td>
                <td>₹{booking?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeBookings;
