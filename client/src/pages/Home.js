import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/contactus.avif";
const HomePage = () => {
  return (
    <div className="container mt-5 pt-3" style={{ minHeight: "52vh" }}>
      <div className="row">
        <div className="col-md-6">
          <h1 className="mb-2" style={{ color: "white" }}>
            Welcome to Tour Management System
          </h1>
          <p className="fs-6" style={{ color: "rgb(202 202 202)" }}>
            Embark on a journey of exploration and education with Tour
            Management System. We specialize in facilitating enriching
            industrial visits tailored specifically for colleges and educational
            institutions. At Tavelus, we understand the importance of bridging
            theoretical knowledge with real-world experiences, and our
            meticulously crafted industrial visit programs aim to do just that.
          </p>
          <Link to="/login" className="btn btn-primary my-4">
            Login
          </Link>
        </div>
        <div className="col-md-6">
          <img src={image} alt="Sport Event" className="img-fluid rounded" />
        </div>
      </div>

      <hr />
    </div>
  );
};

export default HomePage;
