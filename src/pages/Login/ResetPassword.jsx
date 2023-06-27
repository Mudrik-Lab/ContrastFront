import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FilterExplanation, ToastBox } from "../../components/Reusble";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-negative-icon.svg";
import resetPassword from "../../apiHooks/resetPassword";

export default function ResetPassword() {
  const [serverError, setServerError] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [token, setToken] = React.useState(false);
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    retypePassword: "",
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.get("email") && setEmail(queryParams.get("email"));
    queryParams.get("token") && setToken(queryParams.get("token"));
  }, []);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[0-9])/, "Password must contain at least one digit")
      .required("Password is required"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please retype your password"),
  });
  const handleSubmit = async (values) => {
    try {
      const res = await resetPassword({
        email: email,
        token: decodeURIComponent(token),
        password: values.password,
      });
      res.status === 201 &&
        toast.success(
          <ToastBox
            headline={"Password was reset successfully"}
            text={`You are being redirected back to Login page`}
          />
        );
      setTimeout(() => navigate("/login"), 1500);
      if (res.error) {
        setServerError(res.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl">New Password</h2>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({ isSubmitting, dirty, isValid }) => (
              <Form>
                <div className="flex flex-col items-center gap-5 px-4">
                  <div className="flex flex-col items-center">
                    <Field
                      type="password"
                      placeholder="Chose new password"
                      id="password"
                      name="password"
                      className={fieldClass}
                    />
                    <FilterExplanation
                      text={"8 characters or more with at least one digit"}
                      tooltip={""}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={errorMsgClass}
                    />
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <Field
                      type="password"
                      placeholder="Retype your new password"
                      id="retypePassword"
                      name="retypePassword"
                      className={fieldClass}
                    />

                    <ErrorMessage
                      name="retypePassword"
                      component="div"
                      className={errorMsgClass}
                    />
                  </div>

                  <div className="border-b border-black w-full my-4"></div>
                  {serverError && (
                    <p className={errorMsgClass}>{serverError}</p>
                  )}
                  <div className="flex flex-col justify-center w-full gap-4 items-center">
                    <div className="flex justify-start w-full gap-4 items-center">
                      <button
                        disabled={!(dirty && !isSubmitting && isValid)}
                        className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                        type="submit">
                        <ProfileIcon /> Activate and Login
                      </button>
                      <button
                        className="text-blue text-lg"
                        onClick={() => navigate("/")}>
                        Cancel
                      </button>
                    </div>
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
