import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { backendLocation } from "../../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TourLogin = () => {
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await axios.post(
        `${backendLocation}/tour/login`,
        values
      );
      if (data.message) {
        setServerError(data.message);
      } else {
        login();
        navigate(`/`);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "tour");
      }
    } catch (error) {
      console.log(error);
    }
    // resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5 view-height">
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
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Tour Login</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type={showPassword ? "text" : "password"} // Conditionally set the type based on showPassword state
                      id="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide Password" : "Show Password"}
                  </button>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary mt-3">
                      Submit
                    </button>
                    <Link to={"/tour/forget-password"}>Forget Password</Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourLogin;
