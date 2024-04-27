import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../../config";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [serverError, setServerError] = useState(false);
  const [contacts, setContacts] = useState([]);
  // const { role } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${backendLocation}/admin/contacts`);
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setContacts(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
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
      <h1>View Contacts</h1>
      {contacts.length > 0 ? (
        <table className="table mt-4">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Subject</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.reverse().map((contact) => (
              <tr key={contact._id}>
                <td>{contact.user.name}</td>
                <td>{contact.subject}</td>
                <td>{contact.description}</td>
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
