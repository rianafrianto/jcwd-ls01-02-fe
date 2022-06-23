import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username must be 4 to 15 characters.")
      .max(15, "Username must be 4 to 15 characters.")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      let res = await axios.post(`${API_URL}/auth/register`, values);
      console.log(res.data);
      dispatch({ type: "LOGIN", payload: res.data });
      Cookies.set("token", res.headers["x-token-access"]);
      toast.success(`welcome ${values.username}`);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="w-screen h-screen flex bg-green-500">
      <div className="w-1/2 h-full border border-black">SIGN UP</div>
      <div className="w-1/2 h-full border flex border-black">
        <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-center py-10">
          INPUT CONTAINER
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              const {
                handleChange,
                errors,
                touched,
                isSubmitting,
                isValid,
                values,
                dirty,
                handleBlur,
              } = formik;

              return (
                <Form className="flex flex-col items-center gap-y-5">
                  <div className="w-full relative">
                    <label htmlFor="">Username</label>
                    <input
                      name="username"
                      placeholder="username"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`w-full p-2 px-4 outline outline-1 outline-gray-800`}
                    />
                    {errors.username && touched.username ? (
                      <div className="absolute text-red-600">
                        {errors.username}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="">Email</label>
                    <input
                      name="email"
                      placeholder="email"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`w-full p-2 px-4 outline outline-1 outline-gray-800`}
                    />
                    {errors.email && touched.email ? (
                      <div className="absolute text-red-600">
                        {errors.email}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="">Password</label>
                    <input
                      name="password"
                      placeholder="password"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`w-full p-2 px-4 outline outline-1 outline-gray-800`}
                    />
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="">Confirm Password</label>
                    <input
                      name="passwordConfirm"
                      placeholder="confirm password"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`w-full p-2 px-4 outline outline-1 outline-gray-800`}
                    />
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-44 border border-green-500 hover:bg-green-500 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    SIGN UP
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
