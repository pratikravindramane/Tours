import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate } from "react-router-dom";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [serverError, setServerError] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get(`${backendLocation}/places`); // Replace "/api/places" with your actual API endpoint
      if (data.message) {
        setServerError(data.message);
      } else {
        setPlaces(data);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  useEffect(() => {
    // Fetch places data from the server
    fetchPlaces();
  }, []);

  const handleImageClick = (placeId) => {
    // Navigate to the details page of the clicked place
    // Implement your navigation logic here
    navigate("/place/" + placeId);
    console.log("Clicked place:", placeId);
  };

  const deleteHandler = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${backendLocation}/admin/delete/place/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.message) {
        setServerError(response?.data?.message);
      }
      else{
        fetchPlaces()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="places-container" style={{ minHeight: "80vh" }}>
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
      {places?.reverse().map((place) => (
        <div className="place-card">
          <div key={place._id} onClick={() => handleImageClick(place._id)}>
            <img
              src={backendLocation + "/public/" + place.image}
              alt={place.location}
              className="place-image"
            />
            <div className="place-details">
              <h3>{place.location}</h3>
              <p>{place.address}</p>
            </div>
          </div>
          {role === "admin" && (
            <button
              className="btn text-danger"
              style={{ zIndex: "100" }}
              onClick={() => deleteHandler(place._id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlacesPage;
