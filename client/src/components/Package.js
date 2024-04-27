import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendLocation } from "../config";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Package = ({ pkg, a, place }) => {
  const [amount, setAmount] = useState(a);
  const [people, setPeople] = useState(1);
  const [serverError, setServerError] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [mode, setMode] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const createOrder = async () => {
    try {
      const response = await axios.post(
        `${backendLocation}/college/create-order`,
        {
          amount,
        }
      );
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
            amount: amount,
            place: place._id,
            peoples: people,
            mode,
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
    <div className="card mb-4">
      <div className="card-body">
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <select
            className="form-select"
            onChange={(e) => {
              setAmount(pkg.mode[e.target.value] * people);
              setMode(e.target.value);
            }}
          >
            {pkg.mode?.bus && (
              <option value={"bus"}>Bus {pkg.mode?.bus}</option>
            )}
            {pkg.mode?.train && (
              <option value={"train"}>Train {pkg.mode?.train}</option>
            )}
            {pkg.mode?.airline && (
              <option value={"airline"}>Airline {pkg.mode?.airline}</option>
            )}
          </select>
          <div className="d-grid mx-3">
            <label htmlFor="noOfPeople" className="mb-0">
              People
            </label>
            <input
              type="number"
              id="noOfPeople"
              className="form-control"
              min={1}
              value={people}
              onChange={(e) => {
                setPeople(e.target.value);
                setAmount(amount * e.target.value);
              }}
            />
          </div>
          <h6 className="mb-0">{`Total Price: ${amount}`}</h6>
        </div>

        <button
          onClick={() => bookHandler(pkg._id, pkg.tour)}
          className="btn btn-primary"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Package;
