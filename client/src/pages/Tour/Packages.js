import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../../config";
import { jwtDecode } from "jwt-decode";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/tour/view-package/${decode.id}`,
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
          setPackages(response?.data);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
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
      <h1>View Packages</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Start From</th>
            <th>Duration</th>
            <th>Bus</th>
            <th>Train</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg._id}>
              <td>{pkg?.name}</td>
              <td>{pkg?.place?.location}</td>
              <td>{pkg?.startPoint}</td>
              <td>{pkg?.duration}</td>
              <td>₹{pkg.mode.bus || "-"}</td>
              <td>₹{pkg.mode.train || "-"}</td>
              <td>₹{pkg.mode.airline || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Packages;
