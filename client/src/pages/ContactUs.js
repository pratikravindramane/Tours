// ContactUsPage.js
import React from "react";

const ContactUsPage = () => {
  return (
    <div className="container mt-5" style={{ minHeight: "52vh" }}>
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6 d-grid justify-content-center align-items-center">
          <p>
            Contact information:
            <br />
            Email: example@example.com
            <br />
            Phone: 123-456-7890
            <br />
            Address: 1234 Main Street, City, Country
          </p>
          <p>
            Nullam vestibulum, leo non interdum faucibus, libero enim varius
            nisl, nec pharetra sem arcu non nisi. Nulla facilisi. Suspendisse
            potenti. Vivamus varius velit nec nunc sodales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
