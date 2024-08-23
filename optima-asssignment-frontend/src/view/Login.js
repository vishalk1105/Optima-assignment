import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactButton from "../app/components/ReactButton";
import urlConfig from "../config/urlConfig";
const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = (values, { resetForm }) => {
    axios
      .post(`${urlConfig.baseUrl}${urlConfig.login}`, values)
      .then((result) => {
        if (result.status === 200) {
          const token = result.data.response.token;
          const userId = result.data.response._id;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          resetForm();
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.error === "Invalid Password") {
              setError("Invalid Password");
            } else if (error.response.data.error === "Invalid Email") {
              setError("Invalid Email");
            }
          } else {
            setError("Invalid Password Or Email");
          }
        }
      });
  };

  return (
    <div className="login_main_div">
      <div className="login_form">
        <h2 className="text-center">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="container">
              <div className="mb-3">
                <label htmlFor="email" className="form-label ">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
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
              <div>
                {error && (
                  <p className="text-danger" style={{ marginBottom: "10px" }}>
                    {error}
                  </p>
                )}
              </div>

              <ReactButton
                btnText={"Login"}
                btnClass={"login_btn px-5"}
                btnType={"submit"}
              />

              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
