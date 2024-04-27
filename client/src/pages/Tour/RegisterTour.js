import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendLocation } from "../../config";

const TourRegister = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    packages: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits long"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    packages: Yup.array(),
  });

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newTour = await axios.post(`${backendLocation}/tour/register`, {
        ...values,
      });
      if (newTour.data.message) {
        setServerError(newTour.data.message);
      } else {
        navigate("/tour/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
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
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Register as Tour</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className={`form-control ${
                          errors.name && touched.name ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${
                          errors.email && touched.email ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <Field
                        type="text"
                        name="phone"
                        className={`form-control ${
                          errors.phone && touched.phone ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`form-control ${
                            errors.password && touched.password
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="btn btn-outline-secondary"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourRegister;
