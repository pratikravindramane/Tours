import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendLocation } from "../config";
import { useAuth } from "../context/AuthContext";
import PackageModal from "./Tour/PackageModal";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
const PlacePage = () => {
  const [place, setPlace] = useState({});
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem("token");
  const [serverError, setServerError] = useState(false);
  const [show, setShow] = useState(false);
  const { role } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");

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
          setAmount(response?.data?.price);
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

  const createOrder = async () => {
    try {
      const response = await axios.post(
        `${backendLocation}/college/create-order`,
        {
          amount,
        }
      );
      console.log(response.data.id);
      setOrderId(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };
  const bookHandler = async (id, tour) => {
    await createOrder();
    const options = {
      key: process.env.KEY_ID,
      amount: amount, // Amount in paise (e.g., 1000 paise = ₹10)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://example.com/your_logo.png",
      order_id: orderId,
      handler: async (response) => {
        console.log(response);
        // Handle success
        const res = await axios.post(
          `${backendLocation}/college/create-booking`,
          {
            package: id,
            date: moment(Date.now()).format("DD/MM/YYYY"),
            college: decode.id,
            tour,
            price:amount,
            place:place._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res?.data?.message) {
          setServerError(res?.data?.message);
        } else {
          navigate("/college/bookings");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Test Address",
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentObject = new window.Razorpay(options);
    await paymentObject.open();
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
            <button onClick={() => setShow(true)}>ADD Package</button>
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
                  <p className="card-text">Price: {pkg.price}</p>
                  <p className="card-text">Duration: {pkg.duration} days</p>
                  <p className="card-text">Start Point: {pkg.startPoint}</p>
                  {role === "college" && (
                    <button onClick={() => bookHandler(pkg._id, pkg.tour)}>
                      Book
                    </button>
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
