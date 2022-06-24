import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import Cookies from "js-cookie";

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);

  // let message = [];
  // if (error_mes) {
  //   message = error_mes.split(",");
  // }

  const initialValues = {
    personId: "",
    password: "",
  };
  const containSpaces = (string) => / /g.test(string);
  const validationSchema = Yup.object({
    personId: Yup.string()
      .required("Username/Email is required!")
      .test(
        "Must not contain a space",
        "Must not contain a space",
        (value) => !containSpaces(value)
      ),
    password: Yup.string().required("Password is required!"),
  });

  const onSubmit = async (values, onSubmit) => {
    try {
      let res = await axios.post(`${API_URL}/auth/login`, {
        username: values.personId,
        email: values.personId,
        password: values.password,
      });
      // console.log(res.data);
      Cookies.set("token", res.headers["x-token-access"]);
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success(`welcome back ${res.data.username}`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      setTimeout(() => {
        res.data.verified ? navigate("/home") : navigate("/unverified");
        // res.data.verified ? navigate("/home") : navigate("/verification");
        // toast.success(`Welcome back, ${res.data.personId}!`, {
        //   theme: "colored",
        //   position: "top-center",
        //   style: { backgroundColor: "#3A7D44" },
        // });
      }, 500);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      onSubmit.setSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex bg-green-500">
      <div className="w-1/2 h-full border border-black">LOGIN</div>
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
                    <label htmlFor="personId">Username / Email</label>
                    <input
                      name="personId"
                      placeholder="Username or Email"
                      onChange={(e) => {
                        setChanged(true);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      value={values.personId}
                      className={
                        errors.personId &&
                        touched.personId &&
                        values.personId.length &&
                        dirty &&
                        !changed
                          ? "w-full p-2 px-4 outline outline-1 outline-gray-800"
                          : "w-full p-2 px-4 outline outline-1 outline-gray-800"
                      }
                    />
                    {errors.personId &&
                    touched.personId &&
                    dirty &&
                    values.personId.length ? (
                      <div name="personId" className="absolute text-red-600">
                        {errors.personId}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>

                  <div className="w-full relative">
                    <label htmlFor="password">Password</label>
                    <input
                      name="password"
                      placeholder="password"
                      type="password"
                      onChange={(e) => {
                        setChanged(true);
                        handleChange(e);
                      }}
                      autoFocus={false}
                      value={values.password}
                      onBlur={handleBlur}
                      className={
                        errors.personId &&
                        touched.personId &&
                        values.personId.length &&
                        dirty &&
                        !changed
                          ? "w-full p-2 px-4 outline outline-1 outline-gray-800"
                          : "w-full p-2 px-4 outline outline-1 outline-gray-800"
                      }
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
                    disabled={!isValid || isSubmitting || !changed}
                    className="w-44 border border-green-500 hover:bg-green-500 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    LOGIN
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

export default LogIn;
