import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FilterExplanation } from "../../components/Reusble";
import { fieldClass } from "../../Utils/HardCoded";
import { Button } from "flowbite-react";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-negative-icon.svg";

export default function RegisterComponent() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[0-9])/, "Password must contain at least one digit")
      .required("Password is required"),
  });
  console.log(validationSchema);
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl font-bold text-blue">Register</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            isInitialValid
            onSubmit={handleSubmit}>
            {({ isValid }) => (
              <Form className="flex flex-col items-center gap-5 px-4">
                <div className="mb-4 flex flex-col items-center ">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={fieldClass}
                  />
                  <FilterExplanation
                    text={"A rememberable user name "}
                    tooltip={""}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={fieldClass}
                  />
                  <FilterExplanation
                    text={"Your academic email address "}
                    tooltip={""}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={fieldClass}
                  />
                  <FilterExplanation
                    text={"8 characters or more with at least one digit "}
                    tooltip={""}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
                <div className="border-b border-black w-full my-4"></div>
                <div className="flex justify-start w-full gap-4 items-center">
                  <button
                    disabled={!isValid}
                    type="submit"
                    className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50">
                    <ProfileIcon /> Continue
                  </button>
                  <button className="text-blue text-lg" type="reset">
                    Cancel
                  </button>
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
