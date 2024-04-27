import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { backendLocation } from "../../config";

const PackageModal = ({ show, handleClose, data }) => {
  const [serverError, setServerError] = useState(false);

  const initialValues = {
    name: "",
    duration: "",
    startPoint: "",
    bus: "",
    train: "",
    airline: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be positive"),
    startPoint: Yup.string().required("Start point is required"),
    bus: Yup.number().nullable().positive("Bus price must be positive"),
    train: Yup.number().nullable().positive("Train price must be positive"),
    airline: Yup.number().nullable().positive("Airline price must be positive"),
  });

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");

    try {
      const { datas } = await axios.post(
        `${backendLocation}/tour/create-package`,
        {
          ...values,
          place: data.place,
          tour: data.tour,
          bus: values.bus,
          train: values.train,
          airline: values.airline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (datas.message) {
        setServerError(datas.message);
      } else {
        handleClose();
      }
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };

  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: show ? "block" : "none" }}
    >
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
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Item</h5>
            <button type="button" className="close btn btn-danger" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
                        touched.name && errors.name ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duration" className="form-label">
                      Duration Days
                    </label>
                    <Field
                      type="number"
                      name="duration"
                      className={`form-control ${
                        touched.duration && errors.duration ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="startPoint" className="form-label">
                      Start Point
                    </label>
                    <Field
                      type="text"
                      name="startPoint"
                      className={`form-control ${
                        touched.startPoint && errors.startPoint
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="startPoint"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bus" className="form-label">
                      Bus Price
                    </label>
                    <Field
                      type="number"
                      name="bus"
                      className={`form-control ${
                        touched.bus && errors.bus ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="bus"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="train" className="form-label">
                      Train Price
                    </label>
                    <Field
                      type="number"
                      name="train"
                      className={`form-control ${
                        touched.train && errors.train ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="train"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="airline" className="form-label">
                      Airline Price
                    </label>
                    <Field
                      type="number"
                      name="airline"
                      className={`form-control ${
                        touched.airline && errors.airline ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="airline"
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
  );
};

export default PackageModal;
