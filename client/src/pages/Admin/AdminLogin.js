import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../../utils/Validation";
import { backendLocation } from "../../config";

function AdminLogin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${backendLocation}/admin/login`,
        values
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        login();
        navigate(`/`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="container mt-5 py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {serverError && (
            <div className="alert alert-danger" role="alert">
              {serverError}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setServerError(false)}
              ></button>
            </div>
          )}
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4">Admin Login</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validateLogin}
                onSubmit={handleSubmit}
              >
                {({ dirty, isValid }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="form-control"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error text-danger"
                      />
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!dirty || !isValid}
                      >
                        Submit
                      </button>
                      <Link to={"/admin/forget-password"}>
                        Forgot Password?
                      </Link>
                    </div>
                    <div>
                      <Link to={"/"} className="btn btn-link">
                        Back
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
