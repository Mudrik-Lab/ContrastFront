import { ErrorMessage, Field, Form, Formik, isPromise } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import countryList from "react-select-country-list";
import {
  ToastError,
  generateSelectOptions,
  rawTextToShow,
} from "../../Utils/functions";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-negative-icon.svg";
import Navbar from "../../components/Navbar";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import createProfile from "../../apiHooks/createRegistrationDetails";
import { Checkbox } from "../../components/Reusble";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getFormConfig from "../../apiHooks/getFormConfiguration";
import getUser from "../../apiHooks/getUser";
import { format } from "date-fns/esm";

export default function SecondaryRegister() {
  const [errorMsg, setErrorMsg] = useState("");
  const [dateError, setDateError] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [searchParams] = useSearchParams();
  const isNewUser = searchParams.get("new");

  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const countryOption = useMemo(() => countryList().getData(), []);
  const currentYear = new Date().getFullYear();

  const { data, isSuccess } = useQuery([`form_configurations`], getFormConfig);
  const { data: userData, isSuccess: userSuccess } = useQuery(
    [`profile`],
    getUser
  );
  const userId = userData?.data.id;

  let month, day, year;
  if (userSuccess) {
    if (userData.data.date_of_birth) {
      month = format(new Date(userData?.data.date_of_birth), "MM");
      year = format(new Date(userData?.data.date_of_birth), "yyyy");
      day = format(new Date(userData?.data.date_of_birth), "dd");
    }
  }
  const genderOptions = data?.data.gender_options.map((gender) => ({
    value: gender,
    label: rawTextToShow(gender),
  }));
  const academicOptions = data?.data.academic_stage_options.map((stage) => ({
    value: stage,
    label: rawTextToShow(stage),
  }));

  const initialValues = {
    day: day || "",
    month: month || "",
    year: year || "",
    gender: userData?.data.self_identified_gender || "",
    country: userData?.data.country_of_residence || "",
    academicStage: userData?.data.academic_stage || "",
    academicAffiliation: userData?.data.academic_affiliation || "",
    check: userData?.data.has_opted_for_contrast_updates || false, //change to aprroved get updates from Contrast
  };

  useEffect(() => {
    Object.values(initialValues).some((value) => {
      return value === true;
    }) && setIsNew(false);
  }, [userData]);

  const handleSubmit = async (values) => {
    const dateValues = [values.year, values.month, values.day];

    if (
      !dateValues.every((value) => value === "") &&
      !dateValues.every((value) => value !== "")
    ) {
      setDateError(
        "Please complete all fields related to the birthday, or leave all of them empty. "
      );
      return;
    }

    try {
      const result = await createProfile({
        id: userId,
        date_of_birth: `${values.year}-${values.month}-${values.day}`,
        self_identified_gender: values.gender,
        academic_affiliation: values.academicAffiliation,
        country_of_residence: values.country,
        academic_stage: values.academicStage,
        check: values.check,
      });
      isNewUser ? navigate("/") : navigate(-1);
    } catch (e) {
      e.response?.status === 400
        ? setErrorMsg(e.response?.data)
        : ToastError(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl ">Your Profile</h2>
          <div className="flex flex-col items-center gap-5 px-4">
            <h3 className="text-lg text-blue font-bold">
              Welcome, {snap.user.username || snap.tempUsername}{" "}
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
            {isSuccess && userData && (
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ dirty, values }) => {
                  return (
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

                        <Field
                          as="select"
                          id="day"
                          name="day"
                          className={fieldClass + "w-20"}>
                          <option value=""> Day</option>
                          {generateSelectOptions(1, 31)}
                        </Field>

                        <Field
                          as="select"
                          id="year"
                          name="year"
                          className={fieldClass + "w-20"}>
                          <option value=""> Year</option>
                          {generateSelectOptions(1900, currentYear - 18).sort(
                            (a, b) => b.props.value - a.props.value
                          )}
                        </Field>
                      </div>
                      {dateError && (
                        <div className="w-72">
                          <p className={errorMsgClass}>{dateError}</p>{" "}
                        </div>
                      )}

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
                        value={values.academicAffiliation}
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

                      <Field
                        type="checkbox"
                        name="check"
                        component={Checkbox}
                      />

                      {errorMsg && (
                        <p className={errorMsgClass}>
                          Error occured. Try again later.
                          <br /> If you already have a user try to{" "}
                          <a className="underline text-blue" href="/login">
                            login
                          </a>
                        </p>
                      )}

                      <div className="border-b border-black w-full my-4"></div>
                      <div className="flex justify-start w-full gap-4 items-center">
                        <button
                          className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                          type="submit">
                          <ProfileIcon /> {isNew ? "Register" : "Update"}
                        </button>
                        <button
                          className="text-blue text-lg"
                          onClick={() => navigate("/register")}>
                          Back
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            )}
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
}
