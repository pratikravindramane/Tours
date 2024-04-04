import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Contacts = () => {
  const [serverError, setServerError] = useState(false);
  const [constacts, setEvents] = useState([]);
  const { role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendLocation}/admin/contacts`);
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setEvents(response?.data);
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
                e.preDefault();
                setServerError(false);
              }}
              className="button border border-dark bg-danger"
            >
              ok
            </button>
          </div>
        </>
      )}
      <h1>View Contacts</h1>
      {constacts.length > 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>User</th>
              <th>Subject</th>
              <th>Discription</th>
            </tr>
          </thead>
          <tbody>
            {constacts?.reverse().map((e) => (
              <tr key={e._id}>
                <td>{e.user.name}</td>
                <td>{e.subject}</td>
                <td>{e.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Contacts to Show</p>
      )}
    </div>
  );
};

export default Contacts;
