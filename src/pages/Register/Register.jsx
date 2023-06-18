import React, { useState, useMemo } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FilterExplanation } from "../../components/Reusble";
import { fieldClass } from "../../Utils/HardCoded";
import countryList from "react-select-country-list";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-negative-icon.svg";
import { useNavigate } from "react-router-dom";
import { generateSelectOptions } from "../../Utils/functions";
import createRegitration from "../../apiHooks/createRegistration";

export default function RegisterComponent() {
  const [first, setFirst] = useState(true);
  const countryOption = useMemo(() => countryList().getData(), []);
  const genderOptions = [
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" },
    { value: "other", label: "Other" },
    { value: "not_reporting", label: "Not responding" },
  ];
  const academicOptions = [
    { value: "undergraduate_student", label: "Undergraduate Student" },
    { value: "graduate_student", label: "Graduate Student" },
    { value: "postdoctoral_fellow", label: "Postdoctoral Fellow" },
    { value: "principle_researcher", label: "Principle Rresearcher" },
    { value: "other", label: "Other" },
  ];
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    date: { day: "1", month: "1", year: "1900" },
    gender: "",
    country: "",
    academicStage: "",
    academicAffiliation: "",
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

  const handleSubmit = (values) => {
    console.log(values);
    try {
      createRegitration({
        email: values.email,
        password: values.password,
        username: values.name,
      });
    } catch (error) {
      console.log(error);
    }
    setFirst(false);
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
                {first ? (
                  <div className="flex flex-col items-center gap-5 px-4">
                    <div className="mb-4 flex flex-col items-center ">
                      <Field
                        type="text"
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

                      <label className="text-sm" htmlFor="name">
                        Enter your preferred email.
                      </label>
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
                      <label className="text-sm" htmlFor="password">
                        8 characters or more with at least one digit
                      </label>

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <div className="border-b border-black w-full my-4"></div>
                    <div className="flex justify-start w-full gap-4 items-center">
                      <button
                        disabled={!(isValid && dirty)}
                        className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                        type="submit"
                        // onClick={() => setFirst(false)}
                      >
                        <ProfileIcon /> Continue
                      </button>
                      <button
                        className="text-blue text-lg"
                        onClick={() => navigate("/")}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-5 px-4">
                    <h3 className="text-lg">Welcome,{values.name} </h3>

                    <p className="w-72 text-center text-sm">
                      Please fill in the following details for a better
                      experience using ConTraSt database.
                      <br /> <br />
                      This data is not shared with any third party according to
                      our privacy policy
                    </p>
                    <div className="flex gap-4">
                      <Field
                        as="select"
                        id="month"
                        name="date.month"
                        className={fieldClass + "w-20"}>
                        <option value=""> Month</option>
                        {generateSelectOptions(1, 12)}
                      </Field>
                      <ErrorMessage
                        name="date.month"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                      <Field
                        as="select"
                        id="day"
                        name="date.day"
                        className={fieldClass + "w-20"}>
                        <option value=""> Day</option>
                        {generateSelectOptions(1, 31)}
                      </Field>
                      <ErrorMessage
                        name="date.day"
                        component="div"
                        className="text-red-500 mt-1"
                      />

                      <Field
                        as="select"
                        id="year"
                        name="date.year"
                        className={fieldClass + "w-20"}>
                        <option value=""> Year</option>
                        {generateSelectOptions(1900, 2023)}
                      </Field>
                      <ErrorMessage
                        name="date.year"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <Field
                      as="select"
                      id="gender"
                      name="gender"
                      className={fieldClass}>
                      <option value=""> Gender</option>
                      {genderOptions.map((gender) => (
                        <option value={gender.value} key={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </Field>

                    <Field
                      as="select"
                      id="country"
                      name="country"
                      className={fieldClass}>
                      <option value=""> Country of residence</option>
                      {countryOption.map((country) => (
                        <option value={country.value} key={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </Field>

                    {/* <Field
                      as="text"
                      id="academicAffiliation"
                      name="academicAffiliation"
                      placeholder="Academic affiliation"
                      className={fieldClass}></Field> */}
                    <Field id="academicAffiliation" name="academicAffiliation">
                      {({ field, meta }) => (
                        <div>
                          <input
                            className={fieldClass}
                            type="text"
                            {...field}
                            placeholder="Academic affiliation"
                          />
                          {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                          )}
                        </div>
                      )}
                    </Field>

                    <Field
                      as="select"
                      id="academicStage"
                      name="academicStage"
                      className={fieldClass}>
                      <option value=""> Academic stage</option>
                      {academicOptions.map((stage) => (
                        <option value={stage.value} key={stage.value}>
                          {stage.label}
                        </option>
                      ))}
                    </Field>
                    <div className="border-b border-black w-full my-4"></div>
                    <div className="flex justify-start w-full gap-4 items-center">
                      <button
                        disabled={!(isValid && dirty)}
                        className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                        type="submit"
                        // onClick={() => setFirst(false)}
                      >
                        <ProfileIcon /> Register
                      </button>
                      <button
                        className="text-blue text-lg"
                        onClick={() => navigate("/register")}>
                        Back
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer isFixed />
    </div>
  );
}
