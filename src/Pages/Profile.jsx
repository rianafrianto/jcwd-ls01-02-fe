import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import { toast } from "react-toastify";
import DefaultPicture from "../Assets/default_pic.png";
import ChangePassword from "../Component/ChangePassword";
import Button from "../Component/Button";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import ModalImageCropper from "../Component/ModalImageCropper";
import Loading from "../Component/Loading";

function Profile() {
  const dispatch = useDispatch();
  const avaRef = useRef();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);
  let [tab, setTab] = useState(1);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changed, setChanged] = useState(false);
  const [modalImageCropper, setModalImageCropper] = useState(false);
  const [cropping, setCropping] = useState(null);

  const modalImageCropperHandler = () => {
    setModalImageCropper(!modalImageCropper);
  };

  let {
    profile_picture,
    // profile_cover,
    id,
    verified,
    username,
    email,
    fullname,
    // gender,
    // address,
    // age,
    error_mes,
  } = useSelector((state) => state.user);
  if (fullname == null) {
    fullname = "";
  }
  // if (address == null) {
  //   address = "";
  // }
  const [loadingVerify, setloadingVerify] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [profilePicture, setProfilePicture] = useState({
    ava: {
      url: profile_picture ? API_URL + profile_picture : DefaultPicture,
      file: null,
    },
  });

  const initialValues = {
    profile_picture: null,
    fullname,
    username,
    // gender,
    // address,
    // age,
    email,
  };

  const validationSchema = Yup.object({
    // validasi ketika user mengganti username
    fullname: Yup.string().max(50, "Must be 50 characters or fewer"),
    username: Yup.string()
      .min(4, "Username must be 4 to 15 characters.")
      .max(15, "Username  must be 4 to 15 characters.")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces/")
      .required("Username is required!"),
    // address: Yup.string().required("Address is required"),
  });

  const onSubmit = async (values) => {
    let formData = new FormData();
    if (values.profile_picture) {
      values.profile_picture[0] = profilePicture.ava.file;
      formData.append("profile_picture", values.profile_picture[0]);
    }

    let dataInput = {
      username: values.username,
      fullname: values.fullname,
      // gender: values.gender,
      // address: values.address,
      // age: values.age,
    };

    formData.append("data", JSON.stringify(dataInput));
    try {
      setChanged(false);
      setloadingSubmit(true);
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");
      let res = await axios.patch(
        `${API_URL}/profile/profile-update`,
        formData,
        {
          headers: { authorization: `${token}` },
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success("Updated!", {
        theme: "colored",
        position: "top-center",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      setloadingSubmit(false);
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  const sendEmail = async () => {
    try {
      setLoadingEmail(true);
      await axios.post(`${API_URL}/auth/email-verification`, {
        id,
        username,
        email,
      });
      toast.success("Email sent!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEmail(false);
    }
  };

  const onCancel = () => {
    setCropping(null);
  };

  return (
    <>
      {changePassword && (
        <ChangePassword
          changePassword={changePassword}
          setChangePassword={setChangePassword}
        />
      )}
      {modalImageCropper && (
        <ModalImageCropper
          image={cropping}
          cropInit={cropping.crop}
          zoomInit={cropping.zoom}
          setPicture={setProfilePicture}
          picture={profilePicture}
          onCancel={onCancel}
          modalImageCropper={modalImageCropper}
          setModalImageCropper={setModalImageCropper}
          modalImageCropperHandler={modalImageCropperHandler}
        />
      )}
      <div className="h-full w-full bg-green-200 flex justify-center">
        <div className="container h-full flex px-24 py-14 gap-x-11">
          <div className="w-80 bg-white flex flex-col px-10">
            <button className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600">
              Jhon Doe
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(1)}
            >
              Profil
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(2)}
            >
              Proses Pemesanan
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(3)}
            >
              Metode Pembayaran
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(4)}
            >
              Alamat Pengiriman
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(5)}
            >
              Favorite
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(6)}
            >
              Pesan Bantuan
            </button>
          </div>

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
                <Form>
                  <div className="w-full h-[700px] bg-white">
                    {tab === 1 && (
                      <div className="w-full h-full flex flex-col gap-y-5">
                        <div className="w-full text-lg font-semibold px-11 mt-7 -mb-5 ">
                          Edit Profile
                        </div>
                        <div className="w-full text-center text-gray-100"></div>
                        <div className="flex justify-start px-9 h-[700px]">
                          <div className="w-1/4 aspect-square overflow-hidden">
                            <img
                              src={profilePicture.ava.url}
                              className="w-full h-42 mb-3 object-cover"
                            />
                            <input
                              type="file"
                              ref={avaRef}
                              name="profile_picture"
                              id=""
                              accept=".jpg,.jpeg,.JPG,.JPEG,.png"
                              className="hidden"
                              onClick={(event) => (event.target.value = null)}
                              onChange={(event) => {
                                console.log("event :", event.target.files[0]);
                                if (event.target.files[0]) {
                                  console.log("event :", event.target.files[0]);
                                  let format =
                                    event.target.files[0].name.split(".");
                                  format = format[format.length - 1];
                                  const reader = new FileReader();
                                  reader.readAsDataURL(event.target.files[0]);
                                  reader.addEventListener("load", () => {
                                    setCropping({
                                      type: "ava",
                                      value: reader.result,
                                      fileType: event.target.files[0].type,
                                      format,
                                    });
                                    setChanged(true);
                                    setModalImageCropper(true);
                                  });
                                  formik.setFieldValue("profile_picture", [
                                    event.target.files[0],
                                  ]);
                                } else {
                                  setProfilePicture({
                                    ...profilePicture,
                                    ava: {
                                      url: profile_picture
                                        ? API_URL + profile_picture
                                        : DefaultPicture,
                                      file: null,
                                    },
                                  });
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="w-full border rounded-md h-9 hover:bg-teal-500"
                              onClick={() => avaRef.current.click()}
                              disabled={!verified}
                            >
                              Pilih Photo
                            </button>
                            <div className="text-xs mb-3 mt-3">
                              Besar file: Maksimum 5 mb. Extensi file yang
                              diperbolehkan: JPG, JPEG & PNG
                            </div>
                            <button
                              disabled={loadingEmail}
                              className="border border-1 hover:bg-teal-500 disabled:bg-gray-500 mb-3 w-full rounded-md h-9"
                              onClick={sendEmail}
                            >
                              Send Email Verification
                            </button>
                            <button
                              className="w-full border rounded-md h-9 hover:bg-teal-500"
                              onClick={() => {
                                setChangePassword(true);
                              }}
                            >
                              Change Password
                            </button>
                            <div className="my-3 flex flex-col items-center text-center">
                              {loadingVerify ? (
                                <Loading
                                  className={
                                    "animate-spin items-center h-30 w-30"
                                  }
                                />
                              ) : (
                                <>
                                  <div
                                    className={`text-l ${
                                      verified ? `text-primary` : `text-red-600`
                                    }`}
                                  >
                                    {verified ? (
                                      "Already verified!"
                                    ) : (
                                      <div className="flex flex-col">
                                        Not yet verified!
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                            {!verified && (
                              <div className="text-sm mr-5 text-red-600 text-center">
                                Please verify your account to be able to change
                                User Details.
                              </div>
                            )}
                          </div>
                          {/* Personal Data */}
                          {/* Full Name */}
                          <div className="w-3/4">
                            <div>
                              <div className="ml-12">Full Name</div>
                              <input
                                name="fullname"
                                type="text"
                                disabled={!verified}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  setChanged(true);
                                  handleChange(e);
                                }}
                                placeholder="Jhon Doe"
                                value={values.fullname}
                                className={`field-input w-[650px] h-10 pl-16 ml-12 ${
                                  errors.fullname
                                    ? "text-red-600"
                                    : "text-black"
                                }`}
                              />
                              {errors.fullname &&
                              dirty &&
                              values.fullname.length ? (
                                <div
                                  name="fullname"
                                  className="text-red-600 -mt-5 ml-2 text-xs absolute bg-white px-2 -bottom-2 pointer-events-none"
                                >
                                  {errors.fullname}
                                </div>
                              ) : null}
                              <img src="" alt="" />
                            </div>
                            {/* Username */}
                            <div>
                              <div className="ml-12 mt-4">Username</div>
                              <div
                                className={`${
                                  errors.username
                                    ? "text-red-600"
                                    : "text-black"
                                } text-xs ml-12 mb-1`}
                              >
                                {values.username.length}/25
                              </div>
                              <input
                                name="username"
                                type="text"
                                disabled={!verified}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  setChanged(true);
                                  handleChange(e);
                                }}
                                placeholder="Jhondoe"
                                value={values.username}
                                className={`field-input w-[650px] h-10 pl-16 ml-12 ${
                                  errors.username
                                    ? "outline outline-2 outline-red-600"
                                    : "outline-gray-500 outline outline-1 focus:outline-2 focus:outline-black"
                                }`}
                              />
                              {errors.username && dirty ? (
                                <div
                                  name="username"
                                  className="text-red-600 -mt-5 ml-2 text-xs absolute bg-white px-2 -bottom-2 pointer-events-none"
                                >
                                  {errors.username}
                                </div>
                              ) : null}
                              {error_mes && !errors.username && (
                                <div className="text-red-600 mt-1 ml-12 mx-2 text-xs absolute">
                                  {error_mes}
                                </div>
                              )}
                              <img src="" alt="" />
                            </div>

                            <div>
                              <div className="ml-12 mt-5">Gender</div>
                              <input
                                // name="gender"
                                placeholder="Male / Female"
                                className={`field-input w-[650px] h-10 pl-16 ml-12 `}
                              />

                              <img src="" alt="" />
                            </div>
                            <div>
                              <div className="ml-12 mt-4">Emaill Address</div>

                              <input
                                name="email"
                                type="email"
                                value={email}
                                disabled
                                placeholder="jhondoe@gmail.com"
                                className={`field-input w-[650px] bg-neutral-gray h-10 pl-16 ml-12 cursor-not-allowed `}
                              />
                              <div className={`text-red-600 text-xs ml-12`}>
                                Email cannot be changed.
                              </div>
                              <img src="" alt="" />
                            </div>
                            <div>
                              <div className="ml-12 mt-4">Address</div>
                              <input
                                // name="adddress"
                                type="text"
                                placeholder="Jl. Meruya No. 9 Kembangan Jakarta Barat"
                                className={`field-input w-[650px] h-10 pl-16 ml-12 `}
                                // value={address}
                              />
                              <img src="" alt="" />
                            </div>
                            <div>
                              <div className="ml-12 mt-4">Age</div>
                              <input
                                // name="age"
                                type="number"
                                min="18"
                                max="70"
                                placeholder="24"
                                className={`field-input w-[650px] h-10 pl-16 ml-12 `}
                              />
                              <img src="" alt="" />
                            </div>
                            {loadingSubmit ? (
                              <Loading
                                className={"animate-spin h-10 w-10 ml-5"}
                              />
                            ) : (
                              <Button
                                type="submit"
                                buttonContent={
                                  isSubmitting ? "Loading.." : "Save Changes"
                                }
                                disabled={!isValid || isSubmitting}
                                className={`bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-48 mt-6 ml-[517px] ${
                                  isSubmitting && "loading"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                        <div className="w-3/4"></div>
                      </div>
                    )}

                    {tab === 2 && <> Proses Pemesanan</>}
                    {tab === 3 && <>Metode Pembayaran</>}
                    {tab === 4 && <>Alamat Pengiriman</>}
                    {tab === 5 && <>Favorite</>}
                    {tab === 6 && <>Pesan Bantuan</>}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Profile;
