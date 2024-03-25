import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";
import sendVetAPaper from "../../apiHooks/sendVetAPaper";
import { toast } from "react-toastify";
import { ToastBox } from "../../components/Reusble";

export default function VettingPaper() {
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    DOI: "",
    comments: "",
    isAuthor: "Yes",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    DOI: Yup.string()
      .matches(/^10\./, "Please enter a valid DOI.")
      .required("DOI is required."),
    comments: Yup.string(),
  });
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await sendVetAPaper({
        email: values.email,
        DOI: values.DOI,
        comments: values.comments,
        is_author: values.isAuthor,
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
      error.response.status === 400 && setErrorMsg(true);
    }
  };

  return (
    <div className="mx-auto w-full py-4 px-8  flex flex-col items-center gap-4 rounded-md shadow-3xl">
      <h3 className="text-2xl font-bold text-grayReg ">
        Vetting a paper in our database
      </h3>
      <div className="border-b border-black w-full"></div>
      <p className="text-sm">
        To find out if a paper is included in the database, you can{" "}
        <a
          className="underline font-bold"
          href="parameter-distribution-free-queries">
          download a CSV
        </a>{" "}
        with the list of experiments included.{" "}
      </p>

      <p className="text-lg">
        If you found an error in our classifications, or you think we should
        make an adjustment to one or more entries, please let us know using this
        form. Make sure to be very specific, detailing which fields should be
        changed and how:
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isValid, dirty }) => (
          <Form className="w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col ">
                <label
                  className="text-lg font-bold text-blue mb-2"
                  htmlFor="DOI">
                  Paper's DOI:
                </label>
                <Field
                  placeholder={"DOI # "}
                  id="DOI"
                  name="DOI"
                  className={fieldClass + "w-full"}
                />

                <ErrorMessage
                  name="DOI"
                  component="div"
                  className={errorMsgClass}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  className="text-lg font-bold text-blue mb-2"
                  htmlFor="comments">
                  Your Comment:
                </label>
                <Field
                  as="textarea"
                  placeholder={"Please write specific as possible"}
                  id="comments"
                  name="comments"
                  className="border border-gray-300 rounded-sm p-2 h-40 w-full"
                />

                <ErrorMessage
                  name="comments"
                  component="div"
                  className={errorMsgClass}
                />
              </div>

              <div className="flex gap-2 ">
                <label className="text-lg font-bold text-blue ">
                  Are you one of the authors of this paper?{" "}
                </label>
                <label className="flex gap-2 items-center">
                  <Field type="radio" name="isAuthor" value={"Yes"} />
                  YES
                </label>
                <label className="flex gap-2 items-center">
                  <Field type="radio" name="isAuthor" value={"No"} />
                  NO
                </label>
                <ErrorMessage name="isAuthor" component="div" />
              </div>

              <div className="flex flex-col ">
                <label
                  className="text-lg font-bold text-blue mb-2"
                  htmlFor="name">
                  Your Email:
                </label>
                <Field
                  type="email"
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
                    Submit Vet
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
