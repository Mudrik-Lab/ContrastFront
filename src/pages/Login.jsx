import { Form, Formik } from "formik";
import * as React from "react";
import { Button, Spacer, TextInput } from "../components/Reusble";

const formWindow =
  "border-cyan-600 border-2 w-3/6 text-center rounded-md flex flex-col gap-4 p-12";

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({ values, errors, handleChange }) => (
          <Form id="login_form" className={formWindow}>
            <h1 className="text-2xl text-sky-800">Login</h1>
            <span>
              {" "}
              Username: <TextInput onChange={handleChange} name="username" />
            </span>
            <span>
              {" "}
              Password: <TextInput onChange={handleChange} name="password" />
            </span>
            <Spacer height={24} />

            <span>
              {" "}
              <Button type="submit">Submit</Button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};
