import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-negative-icon.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import createRegistration from "../../apiHooks/createRegistration";
import useLogin from "../../apiHooks/loginApi";
import {
  isValidToken,
  setRefreshToken,
  setToken,
} from "../../Utils/tokenHandler";
import { state } from "../../state";
import { useState } from "react";
import { rawTextToShow } from "../../Utils/functions";

export default function RegisterComponent() {
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name is too short").required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[0-9])/, "Password must contain at least one digit")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const result = await createRegistration({
        email: values.email,
        password: values.password,
        username: values.name,
      });
      if (result.status === 201) {
        state.tempUsername = values.name;
        const res = await useLogin(values.name, values.password);
        if (res.error) {
          setServerError(res.error.message);
          console.log(res.error);
        } else {
          if (isValidToken(res.data.access)) {
            setToken(res.data.access);
            setRefreshToken(res.data.refresh);
            state.auth = res.data.access;
            navigate("/profile?new=true");
          }
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response?.data);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl ">Register</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isValid, dirty }) => (
              <Form>
                <div className="flex flex-col items-center gap-5 px-4">
                  <div className=" flex flex-col items-center ">
                    <Field
                      placeholder="User Name"
                      id="name"
                      name="name"
                      className={fieldClass}
                    />
                    <label className="text-sm" htmlFor="name">
                      Choose a username
                    </label>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={errorMsgClass}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <Field
                      type="email"
                      placeholder="Email address"
                      id="email"
                      name="email"
                      className={fieldClass}
                    />

                    <label className="text-sm" htmlFor="name">
                      Enter your preferred email.
                    </label>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={errorMsgClass}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <Field
                      type="password"
                      placeholder="New Password"
                      id="password"
                      name="password"
                      className={fieldClass}
                    />
                    <label className="text-sm" htmlFor="password">
                      8 characters or more with at least one digit
                    </label>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className={errorMsgClass}
                    />
                  </div>
                  {errorMsg && (
                    <p className={errorMsgClass}>
                      {Object.entries(errorMsg).map(([key, msg]) => (
                        <li key={key}>
                          {/* <span className="text-flourishRed text-lg my-1 font-bold ">
                            {rawTextToShow(key)}
                            {": "}
                          </span> */}
                          <span> {Array.isArray(msg) ? msg[0] : msg}</span>
                        </li>
                      ))}
                      <br /> If you already have a user try to{" "}
                      <a className="underline text-blue" href="/login">
                        login
                      </a>
                    </p>
                  )}
                  <div className="border-b border-black w-full my-4"></div>
                  <div className="flex justify-start w-full gap-4 items-center">
                    <button
                      disabled={!(isValid && dirty)}
                      className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                      type="submit">
                      <ProfileIcon /> Continue
                    </button>
                    <button
                      className="text-blue text-lg"
                      onClick={() => navigate("/")}>
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer isFixed />
    </div>
  );
}
