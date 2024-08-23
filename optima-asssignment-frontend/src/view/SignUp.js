import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactButton from "../app/components/ReactButton";
import urlConfig from "../config/urlConfig";

const SignUp = () => {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    userName: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await axios.post(
        `${urlConfig.baseUrl}${urlConfig.signup}`,
        values
      );
      if (data.status === 200) {
        resetForm();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 409) {
        console.log(err.response.status, "error");
        setError(err?.response?.data?.msg);
      }
    }
  };

  return (
    <div className="login_main_div">
      <div className="login_form">
        <h2 className="text-center">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label text-start">
                  Name
                </label>
                <Field
                  name="userName"
                  className={`form-control ${
                    errors.userName && touched.userName ? "is-invalid" : ""
                  }`}
                />
                {errors.userName && touched.userName && (
                  <div className="invalid-feedback">{errors.userName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                    setError("");
                  }}
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                {error && <div className="text-danger">{error}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <ReactButton
                btnText={"Sign Up"}
                btnClass={"login_btn px-4 mt-2"}
                btnType={"submit"}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
