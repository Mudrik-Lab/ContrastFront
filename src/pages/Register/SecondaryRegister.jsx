import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo } from "react";
import countryList from "react-select-country-list";
import { generateSelectOptions } from "../../Utils/functions";
import { fieldClass } from "../../Utils/HardCoded";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-negative-icon.svg";
import Navbar from "../../components/Navbar";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import createProfile from "../../apiHooks/createRegistrationDetails";
import { format } from "date-fns";
import { Checkbox } from "../../components/Reusble";

export default function SecondaryRegister() {
  const snap = useSnapshot(state);
  const countryOption = useMemo(() => countryList().getData(), []);
  const genderOptions = [
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" },
    { value: "other", label: "Other" },
    { value: "not_reporting", label: "Not responding" },
  ];
  const academicOptions = [
    { value: "non_academic", label: "Non Academic" },
    { value: "undergraduate_student", label: "Undergraduate Student" },
    { value: "graduate_student", label: "Graduate Student" },
    { value: "postdoctoral_fellow", label: "Postdoctoral Fellow" },
    { value: "independent_researcher", label: "Independent Rresearcher" },
    { value: "other", label: "Other" },
  ];

  const initialValues = {
    day: "",
    month: "",
    year: "",
    gender: "",
    country: "",
    academicStage: "",
    academicAffiliation: "",
    check: "",
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const result = await createProfile({
        date_of_birth: format(
          new Date(values.year, values.month - 1, values.day),
          "yyyy-MM-dd"
        ),
        self_identified_gender: values.gender,
        academic_affiliation: values.academicAffiliation,
        country_of_residence: values.country,
        academic_stage: values.academicStage,
        check: values.check,
      });
      console.log(result);
      if (result.status === 201) {
        const res = await useLogin(values.name, values.password);

        if (res.error) {
          setServerError(res.error.message);
          console.log(res.error);
        } else {
          if (isValidToken(res.data.access)) {
            setToken(res.data.access);
            setRefreshToken(res.data.refresh);
            state.auth = res.data.access;
            navigate("/register-add-details");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl ">Register</h2>
          <div className="flex flex-col items-center gap-5 px-4">
            <h3 className="text-lg text-blue font-bold">
              Welcome, {snap.tempUsername}{" "}
            </h3>

            <p className="w-72 text-center text-sm">
              Please fill in the following details. They will be used to better
              understand the usage of the ConTraSt database.
              <br /> <br />
              Providing this data is not mandatory, and it will be protected in
              line with our{" "}
              <a className="underline text-blue" href="/terms-of-use">
                privacy policy
              </a>
            </p>
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({ dirty }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Field
                      as="select"
                      id="month"
                      name="month"
                      className={fieldClass + "w-20"}>
                      <option value=""> Month</option>
                      {generateSelectOptions(1, 12)}
                    </Field>
                    <ErrorMessage
                      name="month"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                    <Field
                      as="select"
                      id="day"
                      name="day"
                      className={fieldClass + "w-20"}>
                      <option value=""> Day</option>
                      {generateSelectOptions(1, 31)}
                    </Field>
                    <ErrorMessage
                      name="day"
                      component="div"
                      className="text-red-500 mt-1"
                    />

                    <Field
                      as="select"
                      id="year"
                      name="year"
                      className={fieldClass + "w-20"}>
                      <option value=""> Year</option>
                      {generateSelectOptions(1900, 2023)}
                    </Field>
                    <ErrorMessage
                      name="year"
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

                  <Field
                    // as="text"
                    id="academicAffiliation"
                    name="academicAffiliation"
                    placeholder="Academic affiliation"
                    className={fieldClass}></Field>

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

                  <Field type="checkbox" name="check" component={Checkbox} />

                  <div className="border-b border-black w-full my-4"></div>
                  <div className="flex justify-start w-full gap-4 items-center">
                    <button
                      disabled={!dirty}
                      className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                      type="submit">
                      <ProfileIcon /> Register
                    </button>
                    <button
                      className="text-blue text-lg"
                      onClick={() => navigate("/register")}>
                      Back
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
}
