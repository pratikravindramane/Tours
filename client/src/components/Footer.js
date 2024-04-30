import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Follow Us</h5>
            <ul className="list-inline d-grid">
              <li className="list-inline-item">
                <a href="https://www.facebook.com" style={{ color: "#008080" }}>
                  Facebook
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.twitter.com" style={{ color: "#008080" }}>
                  Twitter
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://www.instagram.com"
                  style={{ color: "#008080" }}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/aboutus" style={{ color: "#008080" }}>About Us</a>
              </li>
              <li>
                <a href="/contactus" style={{ color: "#008080" }}>Contact Us</a>
              </li>
              <li>
                <a href="/login" style={{ color: "#008080" }}>Login</a>
              </li>
              <li>
                <a href="/signup" style={{ color: "#008080" }}>Signup</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row mt-3">
          <div className="col">
            <p className="text-center">&copy; 2024 Tour Management</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
