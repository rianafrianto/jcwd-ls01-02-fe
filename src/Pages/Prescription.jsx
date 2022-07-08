import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import succesImage from "../Assets/success-image.png";
import Button from "../Component/Button";
import DefaultPicture from "../Assets/default-upload.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import ModalImageCropper from "../Component/ModalImageCropper";
import Loading from "../Component/Loading";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import { toast } from "react-toastify";

function Prescription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { isLogin } = useSelector((state) => state.user);
  const [changed, setChanged] = useState(false);
  const [modalImageCropper, setModalImageCropper] = useState(false);
  const [cropping, setCropping] = useState(null);
  let { prescription_photo } = useSelector((state) => state.user);
  const avaRec = useRef();

  const modalImageCropperHandler = () => {
    setModalImageCropper(!modalImageCropper);
  };
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [prescriptionPhoto, setPrescriptionPhoto] = useState({
    ava: {
      url: prescription_photo ? API_URL + prescription_photo : DefaultPicture,
      file: null,
    },
  });
  const initialValues = {
    prescription_photo: null,
  };

  const onSubmit = async (values) => {
    let formData = new FormData();
    if (values.prescription_photo) {
      values.prescription_photo[0] = prescriptionPhoto.ava.file;
      formData.append(" prescription_photo", values.prescription_photo[0]);
    }

    let dataInput = {
      prescription_photo: values.prescription_photo,
    };

    formData.append("data", JSON.stringify(dataInput));
    try {
      setChanged(false);
      setloadingSubmit(true);
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");
      let res = await axios.post(
        `${API_URL}/receipe/prescription-photo`,
        formData,
        {
          headers: { authorization: `${token}` },
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success("Image Upload Success!", {
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
      // setUploadSuccess(false);
    }
  };
  const onCancel = () => {
    setCropping(null);
  };

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  if (uploadSuccess) {
    return (
      <div className="h-full w-screen bg-white flex justify-center items-center pt-20">
        <div className="container h-[500px] w-[400px] flex flex-col justify-between items-center bg-white py-10">
          <img src={succesImage} alt="" />
          <div className="font-bold text-xl">Unggah Resep Berhasil</div>
          <div className="flex text-center text-sm">
            Kamu akan mendapat notifikasi apabila resep doktermu dikonfirmasi
            oleh admin.
          </div>
          <button
            className="border border-green-800 hover:bg-green-800"
            onClick={() => navigate("/myaccount")}
          >
            Lihat progres pemesanan
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      {modalImageCropper && (
        <ModalImageCropper
          image={cropping}
          cropInit={cropping.crop}
          zoomInit={cropping.zoom}
          setPicture={setPrescriptionPhoto}
          picture={prescriptionPhoto}
          onCancel={onCancel}
          modalImageCropper={modalImageCropper}
          setModalImageCropper={setModalImageCropper}
          modalImageCropperHandler={modalImageCropperHandler}
        />
      )}
      <div className="h-full w-screen bg-white flex justify-center">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
              <div className="container h-full flex flex-col px-52 py-14 gap-y-9">
                <div className="w-full bg-white flex flex-col gap-y-2 mt-10">
                  <div className="w-full h-7 flex items-center ml-3 text-xl">
                    Kirim resep
                  </div>
                  <div className="w-full h-6 flex items-center ml-3 -mt-2 text-xs">
                    Tak perlu antre & obat langsung dikirimkan ke lokasi anda !
                    <div className="font-bold ml-1">
                      Foto tidak boleh lebih dari 10 MB.
                    </div>
                  </div>
                </div>
                <div className="w-full h-[550px] drop-shadow-2xl rounded-lg bg-white flex px-16 py-7">
                  <div className="w-full ">
                    Unggah Resep Dokter
                    <div className="w-full h-[400px] rounded-xl px-6 border-dashed border-4 bg-white border-grey mt-5">
                      {/* <div className="flex justify-center mt-20 text-xl">
                      Tarik & Letakan File
                    </div> */}
                      {/* <div className="w-full min-h-min flex flex-col gap-y-5 mt-10">
                      <div className="w-full h-full relative flex justify-center items-center">
                        <div className="outline outline-1 outline-neutral-gray w-[150px] absolute" />
                        <div className="px-5 leading-none z-10 min-h-min bg-cyan-50">
                          atau
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-10 ">
                      <button className="h-10 w-20 border border-green-800 hover:bg-green-800">
                        Unggah
                      </button>
                    </div> */}
                      <div className="w-1/3 aspect-square overflow-hidden items-center ml-80">
                        <img
                          src={prescriptionPhoto.ava.url}
                          className="w-full h-42 mt-5 object-cover items-center justify-center"
                        />
                        <input
                          type="file"
                          ref={avaRec}
                          name="prescription_photo"
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
                              formik.setFieldValue("prescription_photo", [
                                event.target.files[0],
                              ]);
                            } else {
                              setPrescriptionPhoto({
                                ...prescriptionPhoto,
                                ava: {
                                  url: prescription_photo
                                    ? API_URL + prescription_photo
                                    : DefaultPicture,
                                  file: null,
                                },
                              });
                            }
                          }}
                        />
                        {/* <button
                        type="button"
                        className="w-full border rounded-md h-9 mb-3 hover:bg-teal-500"
                        onClick={() => avaRec.current.click()}
                      >
                        Pilih Foto
                      </button> */}
                      </div>
                      <div>
                        {" "}
                        <button
                          type="button"
                          className="w-1/3 mt-5 justify-center border rounded-md h-9 mb-3 ml-80 bg-primary text-white hover:bg-teal-500"
                          onClick={() => avaRec.current.click()}
                        >
                          Pilih Foto
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      {/* <button
                        className="mr-6 mt-5 h-10 w-20 border border-green-800 hover:bg-green-800"
                        onClick={() => setUploadSuccess(false)}
                      >
                        Cancel
                      </button> */}
                      {/* <button
                        className=" mt-5 h-10 w-20 border border-green-800 hover:bg-green-800"
                        onClick={() => setUploadSuccess(true)}
                      >
                        Submit
                      </button> */}
                      <Button
                        type="submit"
                        buttonContent={isSubmitting ? "Loading.." : "Cancel"}
                        disabled={!isValid || isSubmitting}
                        className={`bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-40 mt-6 mr-5 ${
                          isSubmitting && "loading"
                        }`}
                        onClick={() => {
                          setUploadSuccess(false);
                        }}
                      />
                      {loadingSubmit ? (
                        <Loading className={"animate-spin h-10 w-10 ml-5"} />
                      ) : (
                        <Button
                          type="submit"
                          buttonContent={
                            isSubmitting ? "Loading.." : "Save Changes"
                          }
                          disabled={!isValid || isSubmitting}
                          className={`bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-40 mt-6  ${
                            isSubmitting && "loading"
                          }`}
                          onClick={() => {
                            setUploadSuccess(
                              true,
                              localStorage.setItem("uploadSuccess", "PROSES")
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* <button
            className="h-20 w-40 border border-green-800 hover:bg-green-800"
            onClick={() => setUploadSuccess(true)}
          >
            unggah
          </button> */}
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default Prescription;
