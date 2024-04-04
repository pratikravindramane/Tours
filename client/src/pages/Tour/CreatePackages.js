import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { backendLocation } from "../../config";
import axios from "axios";

const CreatePackages = () => {
  const [serverError, setServerError] = useState();
  const initialValues = {
    name: "",
    place: "",
    tour: "",
    price: "",
    duration: "",
    startPoint: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    place: Yup.string().required("Place is required"),
    tour: Yup.string().required("Tour is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be positive"),
    startPoint: Yup.string().required("Start point is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    try {
      const response = await axios.get(
        `${backendLocation}/tour/create-package`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.message) {
        setServerError(response?.data?.message);
      } else {
        navigate("/packages/" + decode.id);
      }
    } catch (error) {}
  };

  return (
    <div className="container mt-5">
      <h1>Add Package</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
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

            <div className="form-group">
              <label htmlFor="place">Place</label>
              <Field
                type="text"
                name="place"
                className={`form-control ${
                  errors.place && touched.place ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="place"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tour">Tour</label>
              <Field
                type="text"
                name="tour"
                className={`form-control ${
                  errors.tour && touched.tour ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="tour"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <Field
                type="number"
                name="price"
                className={`form-control ${
                  errors.price && touched.price ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <Field
                type="number"
                name="duration"
                className={`form-control ${
                  errors.duration && touched.duration ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="duration"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startPoint">Start Point</label>
              <Field
                type="text"
                name="startPoint"
                className={`form-control ${
                  errors.startPoint && touched.startPoint ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="startPoint"
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
  );
};

export default CreatePackages;
