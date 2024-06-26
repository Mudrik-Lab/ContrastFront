import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { state } from "../../../state";
import Navbar from "../../../sharedComponents/Navbar";
import Footer from "../../../sharedComponents/Footer";
import { TooltipExplanation } from "../../../sharedComponents/Reusble";
import { errorMsgClass, fieldClass } from "../../../Utils/HardCoded";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile-negative-icon.svg";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../apiHooks/loginApi";
import {
  isValidToken,
  setRefreshToken,
  setToken,
} from "../../../Utils/tokenHandler";

export default function Login() {
  const [serverError, setServerError] = React.useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await useLogin(values.name, values.password);

    if (res.error) {
      setServerError(res.error.response.data.detail);
    } else {
      if (isValidToken(res.data.access)) {
        setToken(res.data.access);
        setRefreshToken(res.data.refresh);
        state.auth = res.data.access;
        navigate(state.path);
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl">Login</h2>

          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            {({ isSubmitting, dirty }) => (
              <Form>
                <div className="flex flex-col items-center gap-5 px-4">
                  <div className="flex flex-col items-center">
                    <Field
                      placeholder="User Name"
                      id="name"
                      name="name"
                      className={fieldClass}
                    />
                    <TooltipExplanation
                      text={"Your user name for ConTraSt "}
                      tooltip={
                        "Please enter your username and not your e-mail address."
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={errorMsgClass}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <Field
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      className={fieldClass}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={errorMsgClass}
                    />
                    <a
                      href="/request-password-recovery"
                      className="text-blue text-center underline">
                      {" "}
                      Forgot your username or password?
                    </a>
                    <span>
                      Don’t have a username?{" "}
                      <a
                        className="text-blue text-center underline"
                        href="/register">
                        register here
                      </a>{" "}
                    </span>
                  </div>
                  <div className="border-b border-black w-full my-4"></div>
                  {serverError && (
                    <p className={errorMsgClass}>{serverError}</p>
                  )}
                  <div className="flex justify-start w-full gap-4 items-center">
                    <button
                      disabled={!dirty && isSubmitting}
                      className="bg-blue text-white py-2 px-4 rounded-full flex items-center gap-1 disabled:opacity-50"
                      type="submit">
                      <ProfileIcon /> Login
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
