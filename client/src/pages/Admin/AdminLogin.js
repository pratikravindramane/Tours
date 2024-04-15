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
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
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
    <div className="login">
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
      <div>
        <h1 className="mb-0">Admin Login</h1>
        <hr className="my-0" />
        <Formik
          initialValues={initialValues}
          validationSchema={validateLogin}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid }) => (
            <Form>
              <div className="d-grid mt-1">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="d-grid mt-3">
                <label htmlFor="password">Password</label>
                <Field
                  type={showPassword ? "text" : "password"} // Conditionally set the type based on showPassword state
                  id="password"
                  name="password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button>
                  <Link to={"/admin/forget-password"}>Forget Password</Link>
                </div>
                <Link className="button" to={"/"}>
                  Back
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminLogin;
