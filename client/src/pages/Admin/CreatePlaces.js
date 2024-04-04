import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { backendLocation } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPlaceForm = () => {
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    location: "",
    image: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),
    image: Yup.mixed().required("Image is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("location", values.location);
    formData.append("image", values.image);
    formData.append("address", values.address);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${backendLocation}/admin/create-place`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.message) {
        setServerError(response?.data?.message);
      } else {
        navigate("/places");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container mt-5">
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
      <h1>Add Place</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <Field
                type="text"
                name="location"
                className={`form-control ${
                  errors.location && touched.location ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="location"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                className={`form-control-file ${
                  errors.image && touched.image ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field
                type="text"
                name="address"
                className={`form-control ${
                  errors.address && touched.address ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="address"
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

export default AddPlaceForm;
