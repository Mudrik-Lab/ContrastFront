import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";

export default function SuggestingNewQueries() {
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string(),
  });
  const handleSubmit = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      error.response.status === 400 && setErrorMsg(true);
    }
  };
  return (
    <div className="mx-auto w-[658px] py-4 px-8  flex flex-col items-center gap-4 rounded-md shadow-3xl">
      <h3 className="text-2xl font-bold text-grayReg ">
        Suggesting New Queries
      </h3>
      <div className="border-b border-black w-full"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isValid, dirty }) => (
          <Form className="w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col ">
                <label
                  onClick={console.log(isValid)}
                  className="text-lg font-bold text-blue mb-2"
                  htmlFor="name">
                  Your Email:
                </label>
                <Field
                  placeholder={"Email Address"}
                  id="email"
                  name="email"
                  className={fieldClass + "w-full"}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className={errorMsgClass}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  className="text-lg font-bold text-blue mb-2"
                  htmlFor="message">
                  Your Suggestion:
                </label>
                <Field
                  as="textarea"
                  placeholder={"Thank you for your ideas!"}
                  id="message"
                  name="message"
                  className="border border-gray-300 rounded-sm p-2 h-40 w-full"
                />

                <ErrorMessage
                  name="message"
                  component="div"
                  className={errorMsgClass}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 ">
                {errorMsg && (
                  <p className={errorMsgClass}>
                    Error occurred. Try again later.
                  </p>
                )}
                <div className="flex justify-start w-full gap-4 items-center">
                  <button
                    disabled={!(isValid && dirty)}
                    className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50 "
                    type="submit">
                    Submit Suggestion
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
