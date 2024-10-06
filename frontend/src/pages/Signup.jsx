import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { signUpAuth } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await dispatch(signUpAuth(values));
      setSubmitting(false);
      navigate("/");
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
    <div className="items-center flex justify-center flex-col">
      <div className="">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
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
            <Form className="max-w-md mx-auto bg-gray-400 shadow-md rounded px-16 pt-6 pb-8">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
 
  );
};

export default Signup;
