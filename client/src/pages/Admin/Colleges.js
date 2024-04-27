import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../../config";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/admin/view-colleges`,
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
          setColleges(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchColleges();
  }, [token]);

  return (
    <div className="container mt-5">
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
      <h1 className="mb-4">Colleges</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => (
              <tr key={college._id}>
                <td>{college.name}</td>
                <td>{college.email}</td>
                <td>{college.phone}</td>
                <td>{college.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-5"></div>
      <div className="py-5"></div>
      <div className="py-5"></div>
    </div>
  );
};

export default Colleges;
