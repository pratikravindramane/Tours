import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mt-5 pt-3" style={{ minHeight: "52vh" }}>
      <div className="row">
        <div className="col-md-6">
          <h1>Welcome to Sport Event Management</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Vestibulum ultricies convallis ante, nec tincidunt urna
            vestibulum eget. Vivamus at convallis magna, vitae convallis sapien.
            Sed nec sem sit amet nisi consequat volutpat. Curabitur volutpat
            aliquet lorem, at fermentum sem sollicitudin ac. Proin ut lectus
            enim. Cras placerat magna eget justo tristique suscipit.
          </p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src="https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg"
            alt="Sport Event"
            className="img-fluid"
          />
        </div>
      </div>

      <hr />
    </div>
  );
};

export default HomePage;
