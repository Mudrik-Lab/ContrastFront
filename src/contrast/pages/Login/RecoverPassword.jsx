import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Navbar from "../.././sharedComponents/Navbar";
import Footer from "../.././sharedComponents/Footer";
import { TooltipExplanation, ToastBox } from "../.././sharedComponents/Reusble";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";
import { useNavigate } from "react-router-dom";
import recoverPassword from "../../apiHooks/recoverPassword";
import { toast } from "react-toastify";

export default function RecoverPassword() {
  const [serverError, setServerError] = React.useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await recoverPassword({ email: values.email });
      res.status === 201 &&
        toast.success(
          <ToastBox
            headline={"Recover Password"}
            text={`A password recovery message was sent to ${values.email}`}
          />
        );
      resetForm();
      if (res.error) {
        setServerError(res.error.message);
      }
    } catch (error) {
      error.response.status === 400 && setErrorMsg(true);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl">Recover Password</h2>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({ isSubmitting, dirty, isValid }) => (
              <Form>
                <div className="flex flex-col items-center gap-5 px-4">
                  <div className="flex flex-col items-center">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={fieldClass}
                    />
                    <TooltipExplanation
                      text={"Your registered email address "}
                      tooltip={""}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={errorMsgClass}
                    />
                  </div>

                  <div className="border-b border-black w-full my-4"></div>
                  {serverError && (
                    <p className={errorMsgClass}>{serverError}</p>
                  )}
                  <div className="flex flex-col justify-center w-full gap-4 items-center">
                    <button
                      disabled={!(dirty && isValid)}
                      className="bg-white text-blue font-semibold border-[3px] border-blue disabled:text-grayHeavy disabled:border-grayHeavy py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                      type="submit">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1221_569)">
                          <path
                            d="M0.55 3.555C0.650818 3.11324 0.898655 2.71881 1.25292 2.43631C1.60719 2.1538 2.04688 1.99997 2.5 2H14.5C14.9531 1.99997 15.3928 2.1538 15.7471 2.43631C16.1013 2.71881 16.3492 3.11324 16.45 3.555L8.5 8.414L0.55 3.555ZM0.5 4.697V11.801L6.303 8.243L0.5 4.697ZM7.261 8.83L0.691 12.856C0.853183 13.1985 1.10932 13.4878 1.42959 13.6904C1.74985 13.8929 2.12107 14.0003 2.5 14H8.756C8.586 13.5182 8.49943 13.0109 8.5 12.5C8.49931 11.8431 8.64278 11.194 8.92027 10.5986C9.19776 10.0032 9.60252 9.47594 10.106 9.054L9.739 8.829L8.5 9.586L7.261 8.83ZM16.5 4.697V9.671C16.0785 9.14863 15.5454 8.72738 14.9397 8.4382C14.334 8.14903 13.6712 7.99929 13 8C12.3194 7.99912 11.6474 8.153 11.035 8.45L10.697 8.243L16.5 4.697Z"
                            fill={!(dirty && isValid) ? "#B6B6B6" : "#159DEA"}
                          />
                          <path
                            d="M13 16C13.9283 16 14.8185 15.6313 15.4749 14.9749C16.1313 14.3185 16.5 13.4283 16.5 12.5C16.5 11.5717 16.1313 10.6815 15.4749 10.0251C14.8185 9.36875 13.9283 9 13 9C12.0717 9 11.1815 9.36875 10.5251 10.0251C9.86875 10.6815 9.5 11.5717 9.5 12.5C9.5 13.4283 9.86875 14.3185 10.5251 14.9749C11.1815 15.6313 12.0717 16 13 16ZM13.5 11V12.5C13.5 12.6326 13.4473 12.7598 13.3536 12.8536C13.2598 12.9473 13.1326 13 13 13C12.8674 13 12.7402 12.9473 12.6464 12.8536C12.5527 12.7598 12.5 12.6326 12.5 12.5V11C12.5 10.8674 12.5527 10.7402 12.6464 10.6464C12.7402 10.5527 12.8674 10.5 13 10.5C13.1326 10.5 13.2598 10.5527 13.3536 10.6464C13.4473 10.7402 13.5 10.8674 13.5 11ZM13.5 14C13.5 14.1326 13.4473 14.2598 13.3536 14.3536C13.2598 14.4473 13.1326 14.5 13 14.5C12.8674 14.5 12.7402 14.4473 12.6464 14.3536C12.5527 14.2598 12.5 14.1326 12.5 14C12.5 13.8674 12.5527 13.7402 12.6464 13.6464C12.7402 13.5527 12.8674 13.5 13 13.5C13.1326 13.5 13.2598 13.5527 13.3536 13.6464C13.4473 13.7402 13.5 13.8674 13.5 14Z"
                            fill="#159DEA"
                          />
                        </g>
                      </svg>{" "}
                      Send recovery link
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
