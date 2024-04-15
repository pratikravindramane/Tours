import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { backendLocation } from "../../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CollegeLogin = () => {
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to control visibility of password
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
        `${backendLocation}/college/login`,
        values
      );
      if (data.message) {
        setServerError(data.message);
      } else {
        login();
        navigate(`/`);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "college");
      }
    } catch (error) {
      console.log(error);
    }
    // resetForm();
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
              <h2 className="card-title mb-4">Login</h2>
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
                    <div className="password-input-container">
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-sm btn-secondary"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary mt-3">
                      Submit
                    </button>
                    <Link to={"/college/forget-password"}>Forget Password</Link>
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

export default CollegeLogin;
