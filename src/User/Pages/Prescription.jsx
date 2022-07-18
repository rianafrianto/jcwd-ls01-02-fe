import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import succesImage from "../../Assets/success-image.png";
import Button from "../Component/Button";
import DefaultPicture from "../../Assets/default-upload.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

function Prescription() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { isLogin } = useSelector((state) => state.user);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [selectedImage, setselectedImage] = useState({
    file: [],
    filePreview: null,
  });
  // const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
  //   useDropzone({
  //     accept: {
  //       "image/jpeg": [],
  //       "image/png": [],
  //     },
  //   });

  // const acceptedFileItems = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //     <ul>
  //       {errors.map((e) => (
  //         <li key={e.code}>{e.message}</li>
  //       ))}
  //     </ul>
  //   </li>
  // ));

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setselectedImage({
        ...selectedImage,
        file: e.target.files[0],
        filePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const submitPhoto = async () => {
    try {
      let formData = new FormData();
      formData.append("prescription_photo", selectedImage.file);
      let token = Cookies.get("token");
      // await axios.post(`${API_URL}/transaction/prescription-photo`, formData, {
      //   headers: {
      //     authorization: token,
      //   },
      // });

      if (selectedImage.file.length == 0) {
        throw "Please select images to submit!";
      } else {
        setselectedImage({ ...selectedImage, file: [] });
      }
      setTimeout(() => {
        setSucceed(true);
        toast.success("Photo berhasil diunggah!", {
          theme: "colored",
          style: { backgroundColor: "#009B90" },
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    }
  };
  useEffect(() => {
    if (!isLogin) navigate("/home");
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
            onClick={() => navigate("/myaccount/profile")}
          >
            Lihat progres pemesanan
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="h-full w-screen bg-white flex justify-center">
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
                {/* 
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <em>(Only *.jpeg and *.png images will be accepted)</em>
                </div>
                <aside>
                  <h4>Accepted files</h4>
                  <ul>{acceptedFileItems}</ul>
                  <h4>Rejected files</h4>
                  <ul>{fileRejectionItems}</ul>
                </aside> */}
                <div className="w-1/3 aspect-square overflow-hidden items-center ml-80">
                  {selectedImage.filePreview ? (
                    <img
                      src={selectedImage.filePreview}
                      className="w-full h-42 mt-5 object-cover items-center justify-center"
                    />
                  ) : null}
                </div>
                <div>
                  {" "}
                  <input
                    className="hidden"
                    type="file"
                    id="prescription_photo"
                    onChange={onFileChange}
                  />
                  <label
                    htmlFor="prescription_photo"
                    type="button"
                    className="w-1/3 mt-5 justify-center border h-9 mb-3 ml-80 bg-primary text-white hover:bg-teal-500"
                  >
                    Pilih File
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              buttonContent={loadingSubmit ? "Loading.." : "Save Changes"}
              className={`bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-40 mt-6  ${"loading"}`}
              onClick={() => submitPhoto()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescription;
