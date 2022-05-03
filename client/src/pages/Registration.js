import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Registration.css";
import { initReactI18next, useTranslation } from "react-i18next";

function Registration() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    username: "",
    password: "",
    nickName: "",
    location: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    console.log(data);
    if (data.password == data.confirmPassword) {
      axios.get("https://anbda.herokuapp.com/auth/login").then((res) => {
        let usernameExist = res.data.find(
          (user) => user.username === data.username
        );
        if (!usernameExist) {
          axios.post("https://anbda.herokuapp.com/auth", data).then(() => {
            navigate(`/`);

            alert(`Successfully registered!!`);
          });
        } else {
          alert("username already exists");
        }
      });
    } else {
      alert(`password doesn't match`);
    }
  };

  const toLogin = () => {
    navigate(`/login`);
  };

  return (
    <div className="register">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="R-formContainer">
          <div className="R-signUp-form">
            <h1>Sign Up </h1>
            {/* <label>E-mail </label> */}
            <ErrorMessage name="username" component="span" />
            <Field
              autocomplete="off"
              type="email"
              id="inputCreatePost"
              name="username"
              placeholder="E-mail"
            />

            {/* <label>Password </label> */}
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Password"
            />

            {/* <label>Confirm Password </label> */}
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="confirmPassword"
              placeholder="Confirm Password "
            />

            {/* <label>{t("id")}</label> */}
            <Field
              autoComplete="off"
              type="text"
              id="inputCreatePost"
              name="name"
              placeholder={t("id")}
            />
            <div className="R-location">
              {/* <label>{t("Mlocation")}</label> */}
              <Field
                autoComplete="off"
                type="text"
                id="inputCreatePost"
                name="location"
                placeholder={t("location") + "*"}
              />
              <label style={{ textAlign: "left" }}>{t("Mlocation")}</label>
            </div>

            <button className="R-signupbtn" type="submit">
              {" "}
              Sign Up
            </button>
          </div>
          {/* <button onClick={navigate(`/login`)}>Log in</button> */}
        </Form>
      </Formik>
      {/* <div>
        <span>Already have an account?</span>{" "}
      </div>

      <div>wowowow</div>
      <button onClick={toLogin}>Log in</button> */}
    </div>
  );
}

export default Registration;
