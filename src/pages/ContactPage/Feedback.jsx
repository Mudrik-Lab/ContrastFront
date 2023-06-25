import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";
import { RadioFeedback, ToastBox } from "../../components/Reusble";
import sendFeedback from "../../apiHooks/sendFeedback";
import { toast } from "react-toastify";

export default function Feedback() {
  const [errorMsg, setErrorMsg] = useState(false);
  const radioLabelClass = "flex flex-col items-start gap-1";
  const initialValues = {
    message: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string(),
  });
  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const res = await sendFeedback({
        queries_score: values.q1,
        experience_score: values.q2,
        completeness_score: values.q3,
        paper_uploading_score: values.q4,
        comments: values.message,
      });

      if (res.status === 201) {
        toast.success(
          <ToastBox
            headline={"Feedback was sent successfully"}
            text={"Thank you for your feedback!"}
          />
        );
        resetForm();
        setTimeout(() => navigate("/contact"), 2000);
      }
    } catch (error) {
      console.log(error);
      // error.response.status === 400 && setErrorMsg(true);
    }
  };
  return (
    <div className="mx-auto w-[658px] py-4 px-8  flex flex-col items-center gap-4 rounded-md shadow-3xl">
      <h3 className="text-2xl font-bold text-grayReg ">Feedback </h3>
      <div className="border-b border-black w-full"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isValid, dirty }) => (
          <Form className="w-full">
            <div className="flex flex-col gap-4">
              <RadioFeedback
                headline={"Quality of queries"}
                question={"What do you think about our queries?"}
                label1={"Very poor"}
                label2={"Excellent"}
                name={"q1"}
              />
              <RadioFeedback
                headline={"Ease of use of the website"}
                question={"How was your experience using the website?"}
                label1={`Very difficult to use (completely unintuitive)`}
                label2={"Very easy to use (very intuitive)"}
                name={"q2"}
              />
              <div>
                <RadioFeedback
                  headline={"Completeness of the database"}
                  question={
                    "How do you estimate the completeness of the database, with respect to the relevant literature?"
                  }
                  label1={"Many relevant papers are missing"}
                  label2={"All relevant papers are included"}
                  name={"q3"}
                />
                <p className="text-sm">
                  If you think relevant papers are missing, feel free to add add
                  them to the database using{" "}
                  <a href="" className="underline font-bold">
                    this link
                  </a>
                </p>
              </div>
              <div>
                <RadioFeedback
                  headline={"Paper uploading process"}
                  question={`If you added a paper to our database using the "upload new paper" form, how was your experience?`}
                  label1={`Very difficult process (completely unintuitive)`}
                  label2={"Very easy process (very intuitive)"}
                  name={"q4"}
                />
                <p className="text-sm">
                  If you think relevant papers are missing, feel free to add add
                  them to the database using{" "}
                  <a href="" className="underline font-bold">
                    this link
                  </a>
                </p>
              </div>
              <div className="flex flex-col ">
                <label
                  className="text-lg font-bold text-blue mb-2"
                  htmlFor="message">
                  Additional Comments
                </label>
                <p className="text-lg">
                  Here you can add any additional feedback you would like to
                  give us, or elaborate on your answers above.
                </p>
                <Field
                  as="textarea"
                  placeholder={"Thank you for your feedback!"}
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
                    Submit Feedback
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
