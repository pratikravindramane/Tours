import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../../config";
// import { Link } from "react-router-dom";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/admin/view-tours`,
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
          setTours(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTours();
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
      <h1>View Tours</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {tours?.reverse().map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>
                {/* <Link to={`/tour/${e._id}`} className="btn btn-primary">
                  View
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tours;
