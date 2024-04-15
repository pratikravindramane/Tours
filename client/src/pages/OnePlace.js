import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendLocation } from "../config";
import { useAuth } from "../context/AuthContext";
import PackageModal from "./Tour/PackageModal";
import { jwtDecode } from "jwt-decode";
import Package from "../components/Package";
const PlacePage = () => {
  const [place, setPlace] = useState({});
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem("token");
  const [serverError, setServerError] = useState(false);
  const [show, setShow] = useState(false);
  const { role } = useAuth();

  const decode = jwtDecode(token);
  const params = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/place/${params.id}`,
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
          setPlace(response?.data?.place);
          setPackages(response?.data?.packages);
          console.log(response.data.packages);
        }
      } catch (error) {}
    };
    fetch();
  }, []);
  if (!place) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="container view-height my-3">
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
      <div className="place-section">
        <div>
          <h2>{place.location}</h2>
          {role === "tour" && (
            <button
              onClick={() => setShow(true)}
              className="btn btn-primary mb-3"
            >
              ADD Package
            </button>
          )}
        </div>
        <img
          src={backendLocation + "/public/" + place.image}
          alt={place.location}
          className="img-fluid"
          style={{ borderRadius: "10px" }}
        />
        <p className="my-4">Address: {place.address}</p>
      </div>
      <div className="packages-section">
        <h2>Packages</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {packages?.reverse().map((pkg) => (
            <div key={pkg._id} className="col mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{pkg.name}</h5>
                  <p className="card-text">Bus: {pkg.mode?.bus}</p>
                  <p className="card-text">Train: {pkg.mode?.train}</p>
                  <p className="card-text">Airline: {pkg.mode?.airline}</p>
                  <p className="card-text">Duration: {pkg.duration} days</p>
                  <p className="card-text">Start Point: {pkg.startPoint}</p>
                  {role === "college" && (
                    <Package place={place} pkg={pkg} a={pkg.mode?.bus} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PackageModal
        show={show}
        handleClose={handleClose}
        data={{ place: place?._id, tour: decode?.id }}
      />
    </div>
  );
};

export default PlacePage;
