import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../../config";
import { jwtDecode } from "jwt-decode";

const TourBookings = () => {
  const [bookings, setTourBookings] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/tour/view-booking/${decode.id}`,
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
          setTourBookings(response?.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container mt-5 view-height">
      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
          <button
            onClick={() => setServerError(false)}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h1>View Tour Bookings</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>College</th>
            <th>Place</th>
            <th>Package</th>
            <th>Starts From</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((e) => (
            <tr key={e._id}>
              <td>{e?.college?.name}</td>
              <td>{e?.place?.location}</td>
              <td>{e?.package?.name}</td>
              <td>{e?.package?.startPoint}</td>
              <td>{e?.package?.duration}</td>
              <td>{e?.date}</td>
              <td>{e?.package?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourBookings;
