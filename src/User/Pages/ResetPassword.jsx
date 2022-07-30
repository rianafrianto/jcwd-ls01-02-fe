import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Button from "../Component/Button";
import signupImage from "../../Assets/signup-image.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import logo from "../../Assets/logo.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import passwordIcon from "../../Assets/password-icon.png";
import ForgotPasswordModal from "../Component/ForgotPasswordModal";
import FormikControl from "../Component/Formik/FormikControl";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [tokenAlive, setTokenAlive] = useState(false);
  const [verification, setVerification] = useState(false);
  const [failed, setFailed] = useState(false);
  const { username, id, email, verified } = useSelector((state) => state.user);
  const [forgotPasswordModal, forgotPasswordModalHandler] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [changed, setChanged] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConf, setVisibleConf] = useState(false);

  const initialValues = {
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password is too short - minimimum of 8 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?\^\(\)\-\_\+\=])/,
        "Must also contain uppercase, number, and special character (ex. !, #)."
      )
      .required("Password is required!"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match.")
      .required("Passwords do not match."),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(
        `${API_URL}/auth/reset-password`,
        { password: values.password },
        {
          headers: {
            authorization: `${token} verif`,
          },
        }
      );
      setSubmitting(false);
      setTimeout(() => {
        setSucceed(true);
        toast.success("Password berhasil diubah!", {
          theme: "colored",
          style: { backgroundColor: "#009B90" },
        });
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    (async function tokenCheck() {
      try {
        await axios.get(`${API_URL}/auth/token-password`, {
          headers: {
            authorization: `${token} verif`,
          },
        });
        setTokenAlive(true);
        setSucceed(true);
      } catch (error) {
        console.log(error);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {forgotPasswordModal && (
        <ForgotPasswordModal
          forgotPasswordModal={forgotPasswordModal}
          forgotPasswordModalHandler={forgotPasswordModalHandler}
        />
      )}
      <div className="w-screen h-screen flex bg-white">
        <div className="w-1/2 h-full flex justify-center items-center relative">
          <i
            className="btn-plain w-1/6 min-h-min border-neutral-gray border-1 hover:bg-white cursor-pointer absolute left-10 top-10"
            onClick={() => navigate("/home")}
          >
            <img src={logo} alt="" />
          </i>
          <img
            src={signupImage}
            alt=""
            className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="w-1/2 h-full flex shadow-2xl">
          <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-center gap-y-5 py-10 container">
            {succeed && (
              <>
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
                      handleBlur,
                    } = formik;
                    return (
                      <Form className="flex flex-col min-h-min w-full justify-center items-center gap-y-5">
                        {/* Password */}
                        <div className="w-full relative flex flex-col justify-between gap-y-2">
                          {/* <label htmlFor="">Password</label> */}
                          <FormikControl
                            control="INPUT"
                            label="Password"
                            name="password"
                            placeholder="***************"
                            onChange={(e) => {
                              setChanged(true);
                              handleChange(e);
                            }}
                            values={values.password}
                            onBlur={handleBlur}
                            type={visible ? "text" : "password"}
                            className={`pl-14 placeholder:translate-y-1 ${
                              errors.password && touched.password
                                ? "outline-red-700"
                                : null
                            }`}
                          />
                          <button
                            type="button"
                            className="button-general outline-0 h-7 aspect-square absolute right-5 top-10  text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                            onClick={() => setVisible(!visible)}
                          >
                            {visible ? (
                              <BsFillEyeFill className="w-full" />
                            ) : (
                              <BsFillEyeSlashFill className="w-full" />
                            )}
                          </button>
                          <img
                            src={passwordIcon}
                            alt=""
                            className="h-5 w-5 absolute left-5 top-11"
                          />
                        </div>
                        {/* Confrimation Password */}
                        <div className="w-full relative flex flex-col justify-between gap-y-2">
                          <FormikControl
                            control="INPUT"
                            label="Confirmation Password"
                            name="passwordConfirm"
                            placeholder="***************"
                            onChange={(e) => {
                              setChanged(true);

                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            type={visibleConf ? "text" : "passwordConfirm"}
                            className={`pl-14 placeholder:translate-y-1 ${
                              errors.passwordConfirm && touched.passwordConfirm
                                ? "outline-red-700"
                                : null
                            }`}
                          />
                          <button
                            type="button"
                            className="button-general outline-0 h-7 aspect-square absolute right-5 top-10  text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                            onClick={() => setVisibleConf(!visibleConf)}
                          >
                            {visibleConf ? (
                              <BsFillEyeFill className="w-full" />
                            ) : (
                              <BsFillEyeSlashFill className="w-full" />
                            )}
                          </button>
                          <img
                            src={passwordIcon}
                            alt=""
                            className="h-5 w-5 absolute left-5 top-11"
                          />
                        </div>
                        <Button
                          type="submit"
                          buttonContent="Ganti Password"
                          disabled={!isValid || isSubmitting}
                          className="button-primary w-full disabled:bg-gray-600 text-sm leading-5 mt-5"
                        />
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}
            {failed && (
              <>
                <div className="w-full min-h-min text-2xl font-bold">
                  Aduh.. Ada yang salah dengan reset password mu!
                </div>
                <div className="w-full min-h-min">
                  <p className="">Silahkan coba lagi !</p>
                </div>
                <div className="border border-t-0 border-neutral-gray w-full " />
                <div className="w-full flex gap-x-5">
                  <div className="w-full flex flex-col gap-y-2 justify-between">
                    <p className="text-center text-sm">
                      Coba kirimkan ulang email reset password kamu dengan
                      menekan tombol di bawah!
                    </p>
                    <Button
                      type="submit"
                      disabled={loadingEmail}
                      buttonContent={
                        loadingEmail
                          ? "Sedang Mengirim ..."
                          : "Kirim Ulang Email"
                      }
                      className={` btn-primary text-white disabled:bg-gray-600 h-full rounded-lg ${
                        loadingEmail && "button-loading"
                      }`}
                      onClick={() => forgotPasswordModalHandler(true)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
