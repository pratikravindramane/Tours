import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { backendLocation } from "../../config";

const PackageModal = ({ show, handleClose, data }) => {
  const [serverError, setServerError] = useState(false);

  const initialValues = {
    name: "",
    price: "",
    duration: "",
    startPoint: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be positive"),
    startPoint: Yup.string().required("Start point is required"),
  });

  const handleSubmit = async (values) => {
  const token = localStorage.getItem("token");

    try {
      const { datas } = await axios.post(
        `${backendLocation}/tour/create-package`,
        { ...values, place: data.place, tour: data.tour },
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
    } catch (error) {}
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
            <button type="button" className="close" onClick={handleClose}>
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
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
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
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <Field
                      type="number"
                      name="price"
                      className={`form-control ${
                        touched.price && errors.price ? "is-invalid" : ""
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
                        touched.duration && errors.duration ? "is-invalid" : ""
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
