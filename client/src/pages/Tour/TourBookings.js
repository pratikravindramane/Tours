import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { backendLocation } from "../../config";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const TourBookings = () => {
  const [bookings, setTourBookings] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const fetch = async () => {
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
      } catch (error) {}
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
              className="button border border-dark bg-danger"
            >
              ok
            </button>
          </div>
        </>
      )}
      <h1>View TourBookings</h1>
      <table className="table">
        <thead>
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
