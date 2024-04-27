import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../../config";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/admin/view-packages`,
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
        console.log(error);
      }
    };
    fetchPackages();
  }, [token]);

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
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Tour</th>
            <th>Start From</th>
            <th>Duration</th>
            <th>Bus</th>
            <th>Train</th>
            <th>Airlines</th>
          </tr>
        </thead>
        <tbody>
          {packages?.reverse().map((e) => (
            <tr key={e._id}>
              <td>{e?.name}</td>
              <td>{e?.place?.location}</td>
              <td>{e?.tour?.name}</td>
              <td>{e?.startPoint}</td>
              <td>{e?.duration}</td>
              <td>{e?.mode?.bus}</td>
              <td>{e?.mode?.train}</td>
              <td>{e?.mode?.airline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPackages;
