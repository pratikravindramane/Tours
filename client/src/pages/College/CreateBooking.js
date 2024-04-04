import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { backendLocation } from "../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBooking = () => {
  const token = localStorage.getItem("token");
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    date: "",
    time: "",
    venue: "",
    numberOfParticipants: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    date: Yup.date().required("Date is required").min(new Date()),
    time: Yup.string().required("Time is required"),
    venue: Yup.string().required("Venue is required"),
    numberOfParticipants: Yup.number()
      .required("Number of participants is required")
      .positive("Number of participants must be positive"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newCompany = await axios.post(
        `${backendLocation}/admin/create-event`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (newCompany.data.message) {
        setServerError(newCompany.data.message);
      } else {
        navigate("/view-event");
      }
    } catch (error) {
      console.log(error);
    }
    // resetForm();
  };

  return (
    <div className="container mt-5 narrow-form">
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
      <h1>Create Event</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`form-control ${
                  touched.name && errors.name ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <Field
                type="date"
                id="date"
                name="date"
                className={`form-control ${
                  touched.date && errors.date ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="date"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <Field
                type="time"
                id="time"
                name="time"
                className={`form-control ${
                  touched.time && errors.time ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="time"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="venue">Venue</label>
              <Field
                type="text"
                id="venue"
                name="venue"
                className={`form-control ${
                  touched.venue && errors.venue ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="venue"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfParticipants">
                Number of Participants
              </label>
              <Field
                type="number"
                id="numberOfParticipants"
                name="numberOfParticipants"
                className={`form-control ${
                  touched.numberOfParticipants && errors.numberOfParticipants
                    ? "is-invalid"
                    : ""
                }`}
              />
              <ErrorMessage
                name="numberOfParticipants"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBooking;
