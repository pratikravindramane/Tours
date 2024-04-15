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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  console.log(amount)
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
    <div className="card-body">
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
      <div className="d-flex justify-content-between my-3">
        <select
          name=""
          id=""
          onChange={(e) => setAmount(e.target.value * people)}
        >
          {pkg.mode?.bus && (
            <option value={pkg.mode?.bus}>Bus {pkg.mode?.bus}</option>
          )}
          {pkg.mode?.train && (
            <option value={pkg.mode?.train}>Train {pkg.mode?.train}</option>
          )}
          {pkg.mode?.airline && (
            <option value={pkg.mode?.airline}>
              Airline {pkg.mode?.airline}
            </option>
          )}
        </select>
        <div className="d-grid">
          <label htmlFor="noOfPeople">Peoples</label>
          <input
            type="number"
            id="noOfPeople"
            min={1}
            onChange={(e) => {
              setPeople(e.target.value);
              setAmount(amount * e.target.value);
            }}
          />
        </div>
      </div>
      <h4>{`Total Price ${amount}`}</h4>

      <button
        onClick={() => bookHandler(pkg._id, pkg.tour)}
        className="btn btn-primary"
      >
        Book
      </button>
    </div>
  );
};

export default Package;
