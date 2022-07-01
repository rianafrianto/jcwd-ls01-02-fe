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
import cover from "../Assets/cover.jpg";
import cat from "../Assets/cat.jpg";

function Profile() {
  const dispatch = useDispatch();
  const avaRef = useRef();
  const coverRef = useRef();
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
    profile_cover,
    id,
    verified,
    username,
    email,
    fullname,
    gender,
    address,
    age,
    error_mes,
  } = useSelector((state) => state.user);
  if (fullname == null) {
    fullname = "";
  }
  if (address == null) {
    address = "";
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
    gender,
    address,
    age,
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
    address: Yup.string().required("Address is required"),
  });

  const onSubmit = async (values) => {
    let formData = new FormData();
    if (values.profile_picture) {
      values.profile_picture[0] = profilePicture.ava.file;
      formData.append("profile_picture", values.profile_picture[0]);
    }
    if (values.profile_cover) {
      values.profile_cover[0] = profilePicture.cover.file;
      formData.append("profile_cover", values.profile_cover[0]);
    }
    let dataInput = {
      username: values.username,
      fullname: values.fullname,
      gender: values.gender,
      address: values.address,
      age: values.age,
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
          headers: { authorization: `${token} verif` },
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
              Jane Doe
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
                  <div className="w-full h-[550px] bg-white">
                    {tab === 1 && (
                      <div className="w-full h-full flex flex-col gap-y-5">
                        <div className="w-full text-lg font-semibold px-11 mt-5 ">
                          Edit Profile
                        </div>
                        <div className="w-full text-center  text-gray-100"></div>
                        <div className="flex justify-start px-9">
                          <div className="w-1/4 aspect-square overflow-hidden">
                            <img
                              src={profilePicture.ava.url}
                              className="w-full h-42 mb-3 object-cover"
                            />
                            {/* <button className="w-full border rounded-md h-9 mb-3 hover:bg-teal-500">
                              Pilih Foto
                            </button> */}
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
                          </div>

                          <div className="w-3/4">
                            <div>
                              <div className="ml-12">Name</div>

                              <input
                                name="fullname"
                                type="text"
                                onChange={(e) => {
                                  setChanged(true);
                                  handleChange(e);
                                }}
                                placeholder="Jhon Doe"
                                value={values.fullname}
                                className={`field-input w-[650px] h-10 pl-16 ml-12 `}
                              />
                              <img src="" alt="" />
                            </div>

                            <div>
                              <div className="ml-12 mt-4">Gender</div>
                              <input
                                name="gender"
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
                                name="adddress"
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
                                name="usia"
                                type="number"
                                min="18"
                                max="70"
                                placeholder="24"
                                className={`field-input w-[650px] h-10 pl-16 ml-12 `}
                              />
                              <img src="" alt="" />
                              <Button
                                type="submit"
                                buttonText="Simpan"
                                disabled={
                                  !isValid ||
                                  isSubmitting ||
                                  loadingSubmit ||
                                  !changed
                                }
                                className="bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-48 mt-6 ml-[517px]"
                              />
                            </div>
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

// import cat from "../Assets/cat.jpg";
// import cover from "../Assets/cover.jpg";
// import * as Yup from "yup";
// import { Form, Formik } from "formik";
// import { useRef, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import API_URL from "../Helpers/API_URL";
// import Cookies from "js-cookie";
// import ModalImageCropper from "../Component/ModalImageCropper";
// import Loading from "../Component/Loading";
// const Profile = () => {
//   const dispatch = useDispatch();
//   const avaRef = useRef();
//   const coverRef = useRef();
//   const [modalImageCropper, setModalImageCropper] = useState(false);
//   let {
//     profile_picture,
//     profile_cover,
//     id,
//     username,
//     email,
//     verified,
//     fullname,
//     bio,
//     error_mes,
//   } = useSelector((state) => state.user);

//   if (bio == null) {
//     bio = "";
//   }
//   if (fullname == null) {
//     fullname = "";
//   }

//   const [loadingVerify, setloadingVerify] = useState(false);
//   const [loadingSubmit, setloadingSubmit] = useState(false);
//   const [profilePicture, setProfilePicture] = useState({
//     ava: { url: profile_picture ? API_URL + profile_picture : cat, file: null },
//     cover: { url: profile_cover ? API_URL + profile_cover : cover, file: null },
//   });

//   const [changed, setChanged] = useState(false);
//   const [cropping, setCropping] = useState(null);

//   const initialValues = {
//     profile_picture: null,
//     profile_cover: null,
//     fullname,
//     username,
//     bio,
//   };
//   // let [selectedImage, setSelectedImage] = useState(cat);

//   const modalImageCropperHandler = () => {
//     setModalImageCropper(!modalImageCropper);
//   };

//   const validationSchema = Yup.object({
//     fullname: Yup.string().max(50, "Must be 50 characters or fewer"),
//     username: Yup.string()
//       .min(4, "Username must be 4 to 15 characters.")
//       .max(15, "Username  must be 4 to 15 characters.")
//       .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces/")
//       .required("Username is required!"),
//     bio: Yup.string().max(160, "Must be 160 characters or fewer"),
//   });

//   const onSubmit = async (values) => {
//     let formData = new FormData();
//     if (values.profile_picture) {
//       values.profile_picture[0] = profilePicture.ava.file;
//       formData.append("profile_picture", values.profile_picture[0]);
//     }
//     if (values.profile_cover) {
//       values.profile_cover[0] = profilePicture.cover.file;
//       formData.append("profile_cover", values.profile_cover[0]);
//     }

//     let dataInput = {
//       username: values.username,
//       fullname: values.fullname,
//       bio: values.bio,
//     };

//     formData.append("data", JSON.stringify(dataInput));
//     try {
//       setChanged(false);
//       setloadingSubmit(true);
//       dispatch({ type: "LOADING" });
//       let token = Cookies.get("token");
//       let res = await axios.patch(
//         `${API_URL}/profile/profile-update`,
//         formData,
//         {
//           headers: { authorization: token },
//         }
//       );
//       dispatch({ type: "LOGIN", payload: res.data });
//       toast.success("Updated!", {
//         theme: "colored",
//         position: "top-center",
//         style: { backgroundColor: "#3A7D44" },
//       });
//     } catch (error) {
//       dispatch({
//         type: "ERROR",
//         payload: error.response.data.message || "Network Error",
//       });
//     } finally {
//       setloadingSubmit(false);
//     }
//   };

//   const sendEmail = async () => {
//     try {
//       setloadingVerify(true);
//       await axios.post(`${API_URL}/auth/email-verification`, {
//         id,
//         username,
//         email,
//       });
//       dispatch({ type: "DONE" });
//       toast.success("Email sent!", {
//         theme: "colored",
//         position: "top-center",
//         style: { backgroundColor: "#3A7D44" },
//       });
//     } catch (error) {
//       alert(error);
//     } finally {
//       setloadingVerify(false);
//     }
//   };

// const onCancel = () => {
//   setCropping(null);
// };
// // useEffect(() => {
// //   dispatch({ type: "CLEARERROR" });

// //   return () => {
// //     dispatch({ type: "CLEARERROR" });
// //   };
// // }, []);
//   // console.log(profilePicture.ava.url);
//   return (
//     <>
//       {modalImageCropper && (
//         <ModalImageCropper
//           image={cropping}
//           cropInit={cropping.crop}
//           zoomInit={cropping.zoom}
//           setPicture={setProfilePicture}
//           picture={profilePicture}
//           // resetValue={resetValue}
//           onCancel={onCancel}
//           // setCroppedImageFor={setCroppedImageFor}
//           // resetImage={resetImage}
//           modalImageCropper={modalImageCropper}
//           setModalImageCropper={setModalImageCropper}
//           modalImageCropperHandler={modalImageCropperHandler}
//         />
//       )}
//       <div className="min-h-screen flex pt-20 bg-putih justify-center">
//         <div className="w-[600px] rounded-2xl overflow-hidden flex flex-col items-center shadow-2xl my-5">
//           <div className="w-full flex justify-center bg-putih z-10">
//             <div className="bg-putih w-[600px] h-auto py-5 relative z-10 flex flex-col justify-center items-center px-5">
//               <div className="my-3">Account Settings</div>
//               <div className="my-3 flex flex-col items-center text-center">
//                 {loadingVerify ? (
//                   <Loading className={"animate-spin h-10 w-10"} />
//                 ) : (
//                   <>
//                     <div
//                       className={`text-sm ${
//                         verified ? `text-hijau` : `text-merah`
//                       }`}
//                     >
//                       {verified ? (
//                         "Already verified!"
//                       ) : (
//                         <div className="flex flex-col">
//                           Not yet verified!
//                           <button
//                             type="button"
//                             disabled={verified || loadingVerify}
//                             className="shadow-md inline-flex justify-center px-4 py-2 mt-2 text-sm font-medium text-putih bg-hijau border border-transparent rounded-md
//                         disabled:shadow-none disabled:text-white disabled:bg-putih disabled:border-merah disabled:cursor-not-allowed
//                         hover:text-white hover:shadow-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-biru duration-500"
//                             onClick={() => sendEmail()}
//                           >
//                             Send Email Verification
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//               {!verified && (
//                 <div className="text-sm mr-5 text-merah text-center">
//                   Please verify your account to be able to change User Details.
//                 </div>
//               )}
//               <Formik
//                 initialValues={initialValues}
//                 // isValid
//                 // validateOnMount
//                 // validateOnBlur={false}
//                 validationSchema={validationSchema}
//                 onSubmit={onSubmit}
//               >
//                 {(formik) => {
//                   const {
//                     handleChange,
//                     errors,
//                     touched,
//                     isSubmitting,
//                     isValid,
//                     values,
//                     dirty,
//                     handleBlur,
//                   } = formik;
//                   return (
//                     <Form className="flex flex-col items-center gap-y-3">
//                       <div className="flex flex-col relative w-full items-center">
//                         {/* Profile Picture */}
//                         <label
//                           htmlFor="profile_picture"
//                           className="py-2 inline-block"
//                         >
//                           Profile Picture
//                         </label>
//                         <div className="rounded-full w-1/3 aspect-square  border border-gray-500 overflow-hidden relative">
//                           <img
//                             src={profilePicture.ava.url}
//                             alt=""
//                             className="object-cover h-full"
//                           />
//                         </div>
//                         <input
//                           type="file"
//                           ref={avaRef}
//                           name="profile_picture"
//                           accept=".gif,.jpg,.jpeg,.JPG,.JPEG,.png"
//                           className="hidden"
//                           // style={{ display: "none" }}
//                           // className="text-center"
//                           // ref={(fileInput) => (fileInput = fileInput)}
//                           onClick={(event) => (event.target.value = null)}
//                           onChange={(event) => {
//                             console.log("event :", event.target.files[0]);
//                             if (event.target.files[0]) {
//                               console.log("event :", event.target.files[0]);
//                               let format =
//                                 event.target.files[0].name.split(".");
//                               format = format[format.length - 1];
//                               const reader = new FileReader();
//                               reader.readAsDataURL(event.target.files[0]);
//                               reader.addEventListener("load", () => {
//                                 setCropping({
//                                   type: "ava",
//                                   value: reader.result,
//                                   fileType: event.target.files[0].type,
//                                   format,
//                                 });
//                                 setChanged(true);
//                                 setModalImageCropper(true);
//                               });
//                               formik.setFieldValue("profile_picture", [
//                                 event.target.files[0],
//                               ]);
//                             } else {
//                               setProfilePicture({
//                                 ...profilePicture,
//                                 ava: {
//                                   url: profile_picture
//                                     ? API_URL + profile_picture
//                                     : cat,
//                                   file: null,
//                                 },
//                               });
//                             }
//                           }}
//                         />
//                         <button
//                           type="button"
//                           className="shadow-md my-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-putih bg-hijau border border-transparent rounded-md
//                       disabled:shadow-none disabled:text-merah disabled:bg-putih disabled:border-merah disabled:cursor-not-allowed
//                       hover:text-white hover:shadow-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-biru duration-500"
//                           onClick={() => avaRef.current.click()}
//                           disabled={!verified}
//                         >
//                           Change Picture
//                         </button>

//                         {/* Profile Cover */}
//                         <label
//                           htmlFor="profile_cover"
//                           className="py-2 inline-block"
//                         >
//                           Profile Cover
//                         </label>
//                         <div className="w-full aspect-video border rounded-lg border-gray-500 overflow-hidden">
//                           <img
//                             src={profilePicture.cover.url}
//                             alt=""
//                             className="object-cover w-full"
//                           />
//                         </div>
//                         <input
//                           type="file"
//                           ref={coverRef}
//                           className="hidden"
//                           name="profile_cover"
//                           accept=".gif,.jpg,.jpeg,.JPG,.JPEG,.png"
//                           // style={{ display: "none" }}
//                           // className="text-center"
//                           // ref={(fileInput) => (fileInput = fileInput)}
//                           onClick={(event) => (event.target.value = null)}
//                           onChange={(event) => {
//                             if (event.target.files[0]) {
//                               console.log("event :", event.target.files[0]);
//                               const reader = new FileReader();
//                               reader.readAsDataURL(event.target.files[0]);
//                               reader.addEventListener("load", () => {
//                                 setCropping({
//                                   type: "cover",
//                                   value: reader.result,
//                                 });
//                                 setChanged(true);
//                                 setModalImageCropper(true);
//                               });
//                               formik.setFieldValue("profile_cover", [
//                                 event.target.files[0],
//                               ]);
//                             } else {
//                               setProfilePicture({
//                                 ...profilePicture,
//                                 cover: {
//                                   url: profile_cover
//                                     ? API_URL + profile_cover
//                                     : cat,
//                                   file: null,
//                                 },
//                               });
//                             }
//                           }}
//                         />
//                         <button
//                           type="button"
//                           className="shadow-md my-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-putih bg-hijau border border-transparent rounded-md
//                       disabled:shadow-none disabled:text-merah disabled:bg-putih disabled:border-merah disabled:cursor-not-allowed
//                       hover:text-white hover:shadow-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-biru duration-500"
//                           onClick={() => coverRef.current.click()}
//                           disabled={!verified}
//                         >
//                           Change Cover
//                         </button>
//                       </div>
//                       {/* Personal Data */}
//                       <div className="flex flex-col relative w-full items-center">
//                         <div className="flex justify-between w-full items-end">
//                           {/* Full Name */}
//                           <label htmlFor="fullname">Full Name</label>
//                           <div
//                             className={`${
//                               errors.fullname ? "text-merah" : "text-black"
//                             } text-xs`}
//                           >
//                             {values.fullname.length}/50
//                           </div>
//                         </div>
//                         <input
//                           name="fullname"
//                           placeholder="Full Name"
//                           type="text"
//                           onChange={(e) => {
//                             setChanged(true);
//                             handleChange(e);
//                           }}
//                           disabled={!verified}
//                           onBlur={handleBlur}
//                           value={values.fullname}
//                           className={`p-2 rounded-lg bg-putih w-full disabled:cursor-not-allowed disabled:outline-gray-600 ${
//                             errors.fullname
//                               ? "outline outline-2 outline-merah"
//                               : "outline-gray-500 outline outline-1 focus:outline-2 focus:outline-biru"
//                           }`}
//                         />
//                         {errors.fullname && dirty && values.fullname.length ? (
//                           <div
//                             name="fullname"
//                             className="text-merah -mt-5 ml-2 text-xs absolute bg-putih px-2 -bottom-2 pointer-events-none"
//                           >
//                             {errors.fullname}
//                           </div>
//                         ) : null}
//                       </div>

//                       {/* Username */}
//                       <div className="flex flex-col relative w-full items-center">
//                         <div className="flex justify-between w-full items-end">
//                           <label htmlFor="username">Username</label>
//                           <div
//                             className={`${
//                               errors.username ? "text-merah" : "text-black"
//                             } text-xs`}
//                           >
//                             {values.username.length}/15
//                           </div>
//                         </div>
//                         <input
//                           name="username"
//                           placeholder="Username*"
//                           type="text"
//                           onChange={(e) => {
//                             setChanged(true);
//                             handleChange(e);
//                           }}
//                           disabled={!verified}
//                           onBlur={handleBlur}
//                           value={values.username}
//                           className={`p-2 rounded-lg bg-putih w-full disabled:cursor-not-allowed disabled:outline-gray-600 ${
//                             errors.username
//                               ? "outline outline-2 outline-merah"
//                               : "outline-gray-500 outline outline-1 focus:outline-2 focus:outline-biru"
//                           }`}
//                         />

//                         {errors.username && dirty ? (
//                           <div
//                             name="username"
//                             className="text-merah -mt-5 ml-2 text-xs absolute bg-putih px-2 -bottom-2 pointer-events-none"
//                           >
//                             {errors.username}
//                           </div>
//                         ) : null}
//                         {error_mes && !errors.username && (
//                           <div className="text-merah -mt-5 mx-2 text-xs absolute bottom-0">
//                             {error_mes}
//                           </div>
//                         )}
//                       </div>

//                       {/* Bio */}
//                       <div className="flex flex-col relative w-full items-center">
//                         <div className="flex justify-between w-full items-end">
//                           <label htmlFor="bio">Bio</label>
//                           <div
//                             className={`${
//                               errors.bio && touched.bio
//                                 ? "text-merah"
//                                 : "text-black"
//                             } text-xs`}
//                           >
//                             {values.bio.length}/160
//                           </div>
//                         </div>

//                         <textarea
//                           name="bio"
//                           placeholder="Tell us about yourself"
//                           type="text"
//                           onChange={(e) => {
//                             setChanged(true);
//                             handleChange(e);
//                           }}
//                           cols="30"
//                           rows="5"
//                           disabled={!verified}
//                           onBlur={handleBlur}
//                           value={values.bio}
//                           className={`p-2 rounded-lg bg-putih w-full disabled:cursor-not-allowed disabled:outline-gray-600 ${
//                             errors.bio
//                               ? "outline outline-2 outline-merah"
//                               : "outline-gray-500 outline outline-1 focus:outline-2 focus:outline-biru"
//                           }`}
//                         />
//                         {errors.bio && dirty && values.bio.length ? (
//                           <div
//                             name="bio"
//                             className="text-merah -mt-5 ml-2 text-xs absolute bg-putih px-2 -bottom-2 pointer-events-none"
//                           >
//                             {errors.bio}
//                           </div>
//                         ) : null}
//                       </div>
//                       <div className="flex flex-col relative w-full items-center">
//                         <div className="flex justify-between w-full items-end">
//                           <label htmlFor="">Email</label>
//                           <div className={`text-merah text-xs`}>
//                             Email cannot be changed.
//                           </div>
//                         </div>
//                         <input
//                           type="email"
//                           name=""
//                           id=""
//                           className="p-2 outline outline-gray-600 outline-1 rounded-lg bg-putih w-full cursor-not-allowed"
//                           value={email}
//                           disabled
//                         />
//                       </div>
//                       <div className="">
//                         {loadingSubmit ? (
//                           <Loading className={"animate-spin h-10 w-10 ml-5"} />
//                         ) : (
//                           <button
//                             type="submit"
//                             disabled={
//                               !isValid ||
//                               isSubmitting ||
//                               loadingSubmit ||
//                               !changed
//                             }
//                             className="shadow-md inline-flex justify-center px-4 py-2 text-sm font-medium text-putih bg-hijau border border-transparent rounded-md
//                         disabled:shadow-none disabled:text-merah disabled:bg-putih disabled:border-merah disabled:cursor-not-allowed
//                         hover:text-white hover:shadow-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-biru duration-500"
//                           >
//                             Save Changes
//                           </button>
//                         )}
//                       </div>
//                     </Form>
//                   );
//                 }}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
