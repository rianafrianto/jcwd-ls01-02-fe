import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import { toast } from "react-toastify";
// import unknown from "../Assets/unknownpeople.png";
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
  // const { id, username, email, profile_picture, verified, fullname } =
  //   useSelector((state) => state.user);

  const { isLogin } = useSelector((state) => state.user);
  let [tab, setTab] = useState("PROFIL");
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

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
    if (localStorage.getItem("uploadSuccess"))
      setTab(localStorage.getItem("uploadSuccess"));
  }, [isLogin]);

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

  const tabPrint = (tab) => {
    switch (tab) {
      case "PROFIL":
        return (
          <div className="w-full h-full bg-white ">
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
                  <div className="w-full h-full flex flex-col gap-y-5">
                    <div className="w-full text-lg font-semibold px-11 mt-5">
                      Edit Profile
                    </div>
                    {/* <div className="w-full text-center">baris</div> */}
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
                          className="w-full border rounded-md h-9 mb-3 hover:bg-teal-500"
                          onClick={() => avaRef.current.click()}
                          disabled={!verified}
                        >
                          Pilih Foto
                        </button>
                        <div className="text-xs mb-3">
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
                              className={"animate-spin items-center h-30 w-30"}
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
                            Please verify your account to be able to change User
                            Details.
                          </div>
                        )}
                      </div>
                      <Form className="w-full flex flex-col">
                        <div className="ml-12">
                          <div>
                            <div className="mb-2">Full Name</div>
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
                              className={`field-input w-full h-10 ${
                                errors.fullname ? "text-red-600" : "text-black"
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
                            <div className="mb-2 mt-3">User Name</div>
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
                              className={`field-input w-full h-10 ${
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
                            <div className="mb-2 mt-3">Email Address</div>
                            <input
                              name="email"
                              type="text"
                              value={email}
                              disabled
                              placeholder="Jhondoe@mail.com"
                              className={`field-input w-full h-10 bg-neutral-gray cursor-not-allowed`}
                            />
                            <div className={`text-gray text-xs mt-2`}>
                              Email cannot be changed.
                            </div>
                            <div className="mb-2 mt-3">Address</div>
                            <input
                              name="address"
                              type="text"
                              placeholder="Jl. Meruya No. 9 Kembangan Jakarta Barat"
                              className={`field-input w-full h-10 `}
                            />
                            <div className="flex">
                              <div className="w-2/4 mr-5">
                                <div className="mt-3">Age</div>
                                <input
                                  name="age"
                                  type="date"
                                  placeholder=""
                                  className={`field-input w-full h-10 mr-5 `}
                                />
                              </div>
                              <div className="w-2/4 ml-5">
                                <div className="mt-3">Gender</div>
                                <select className="field-input w-full h-10 bg-white rounded-lg">
                                  <option value="">All</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
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
                                className={`bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-48 mt-6  ${
                                  isSubmitting && "loading"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      </Form>
                    </div>
                    <div className="w-3/4"></div>
                  </div>
                );
              }}
            </Formik>
          </div>
        );
      case "PROSES":
        return (
          <>
            <div className="ml-10 mt-8">Daftar Pemesanan</div>
            <div className="flex items-stretch  ">
              <div className="py-4 ml-28 cursor-pointer ">Semua</div>
              <div className="py-4 ml-28 cursor-pointer">Menunggu</div>
              <div className="py-4 ml-28 cursor-pointer">Diproses</div>
              <div className="py-4 ml-28 cursor-pointer">Dikirim</div>
              <div className="py-4 ml-28 cursor-pointer">Selesai</div>
              <div className="py-4 ml-28 cursor-pointer">Dibatalkan</div>
            </div>
            <div className="flex items-stretch  ">
              <div className="py-4 ml-10 font-bold">Jenis Obat</div>
              <button className="py-4 mt-1 ml-10 btn rounded-full btn-ghost border-primary hover:bg-primary">
                Semua Obat
              </button>
              <button className="py-4 mt-1 ml-5 btn rounded-full btn-ghost border-primary hover:bg-primary">
                Obat Resep
              </button>
              <button className="py-4 mt-1 ml-5 btn rounded-full btn-ghost border-primary hover:bg-primary">
                Obat Bebas
              </button>
              {/* <div className="py-4 items-center mt-1 ml-80 ">Urutkan</div> */}
              <div className="hidden lg:flex gap-x-4 items-center ml-80">
                <div>Urutkan</div>
                <select className="select select-primary h-25 w-44 border border-neutral-gray p-2 rounded-lg">
                  <option value="" className="hover:bg-primary">
                    Terbaru
                  </option>
                  <option value="">Terakhir</option>
                </select>
              </div>
            </div>
            <div className="w-[1000px] h-[200px] drop-shadow-lg justify-center ml-10 mr-10 rounded-xl border bg-white border-grey mt-5">
              <div className="py-4 ml-6 text-xs flex items-stretch ">
                Jumat, 5 April 2022, 15:45
                <div className="ml-auto mr-5 h-25 w-30 border bg-danger p-2 rounded text-white  ">
                  Menunggu Konfirmasi
                </div>
              </div>
              <div className="flex items-stretch">
                <img src={DefaultPicture} className="w-28 h-24 ml-6 rounded" />
                <div className="ml-2 text-xs">
                  Nomor Resep
                  <div className="text-base py-1">#123abc456def</div>
                  <div className="text-xs gap-4 mt-8 text-primary">
                    Tampilkan Detail
                  </div>
                </div>
                <div className="ml-auto mr-5">
                  <span className="countdown font-mono text-4xl text-red-400 border-red-400">
                    <span className="--value:10;"></span>:
                    <span className="--value:24;"></span>:
                    <span className="--value:5;"></span>
                  </span>
                </div>
              </div>
              <div className="ml-6 py-6 text-xs text-primary ">
                Costumer Chat Service
              </div>
            </div>
          </>
        );
      case "METODE":
        return <>Metode Pembayaran</>;
      case "ALAMAT":
        return <>Alamat Pengiriman</>;
      case "FAVORITE":
        return <>Favorite</>;
      case "pesan":
        return <>Pesan Bantuan</>;
      default:
        return null;
    }
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
      <div className="h-full w-full bg-green-200 flex justify-center pt-20">
        <div className="container h-full flex px-24 py-14 gap-x-11">
          <div className="w-80 bg-white flex flex-col px-10">
            <div className="w-full h-20 flex items-center">Jane Doe</div>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab("PROFIL")}
            >
              Profil
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab("PROSES")}
            >
              Proses Pemesanan
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab("METODE")}
            >
              Metode Pembayaran
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab("ALAMAT")}
            >
              Alamat Pengiriman
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab("FAVORITE")}
            >
              Favorite
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab("PESAN")}
            >
              Pesan Bantuan
            </button>
          </div>
          <div className="w-full h-[550px] bg-white">{tabPrint(tab)}</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
