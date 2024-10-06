import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { authSignIn } from "../redux/actions/authSignInAction";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await dispatch(authSignIn(values));

      navigate("/posts");
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          setFieldError(error.field, error.message);
        });
      }
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md mx-auto bg-gray-400 shadow-md rounded px-8 py-8">
            <div className="flex flex-col gap-2 text-2xl font-semibold justify-center items-center">
              {/* <p className="">Welcome Back</p>
              <p>To</p> */}
              <p>Agami Blog App</p>
            </div>
            <div className="flex flex-col gap-8 pt-6">
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
