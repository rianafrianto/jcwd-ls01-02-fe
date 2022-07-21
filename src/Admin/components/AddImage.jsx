import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import getCroppedImg from "../../Helpers/cropImage";
import Cropper from "react-easy-crop";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import Loading from "../../User/Component/Loading";

function AddImage(props) {
  const { setModalState, detailImage, setDetailImage, editId } = props;
  let { photo } = detailImage;
  const initialCrop = { x: 0, y: 0 };
  const photoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState(initialCrop);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [selectedImage, setSelectedImage] = useState(photo);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const onFileChange = (e) => {
    setSubmitClicked(false);
    setCrop(initialCrop);
    setZoom(1);
    if (e.target.files[0]) {
      setSelectedImage({
        file: e.target.files[0],
        filePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const onSubmit3 = async (data) => {
    try {
      seterrorMessage("");
      setSubmitClicked(true);
      if (!selectedImage.filePreview) {
        throw { message: "Wajib unggah gambar produk" };
      }
      if (!selectedImage.file) {
        setModalState(4);
        return;
      }
      setLoading(true);
      const { url, file } = await getCroppedImg(
        data.filePreview,
        croppedAreaPixels
      );
      var newFile = new File([file], "image.jpeg", { type: "image/jpeg" });
      setDetailImage({ photo: { file: newFile, filePreview: url } });
      setLoading(false);
      setModalState(4);
    } catch (error) {
      console.log(error);
      seterrorMessage(error.message);
      setLoading(false);
    }
  };
  console.log(selectedImage?.filePreview);
  return (
    <div>
      {loading ? (
        <Loading className={``} />
      ) : (
        <div
          className={`${
            selectedImage?.filePreview ? "h-[400px]" : "h-[340px]"
          } duration-300 w-full flex flex-col gap-y-5 relative items-center justify-center border-y`}
        >
          {selectedImage?.filePreview && (
            <div className="h-72 aspect-video border rounded border-gray-500 overflow-hidden relative">
              <Cropper
                cropShape={"rect"}
                image={selectedImage.filePreview}
                zoom={zoom}
                crop={crop}
                aspect={1}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropComplete}
                objectFit={"vertical-cover"}
                cropSize={{ width: 286, height: 286 }}
              />
              <div className="w-24 flex justify-center items-center bg-primary/10 rounded-lg overflow-hidden absolute h-6 bottom-2 right-2 z-20">
                <button
                  type="button"
                  className="btn-plain h-full rounded-l-lg w-1/3 p-0 overflow-hidden flex justify-center items-center bg-primary hover:bg-primary-dark hover:text-white focus:rounded-l-lg"
                  onClick={() =>
                    zoom <= 1 ? null : setZoom((prev) => prev - 0.25)
                  }
                >
                  <MinusIcon className="h-full" />
                </button>
                <span className="w-1/3 text-center h-full bg-white">
                  {zoom}
                </span>
                <button
                  type="button"
                  className="btn-plain h-full rounded-r-lg w-1/3 p-0 overflow-hidden flex justify-center items-center bg-primary hover:bg-primary-dark hover:text-white focus:rounded-r-lg "
                  onClick={() =>
                    zoom >= 3 ? null : setZoom((prev) => prev + 0.25)
                  }
                >
                  <PlusIcon className="h-full" />
                </button>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={photoRef}
            className="hidden"
            name="photo"
            accept=".gif,.jpg,.jpeg,.JPG,.JPEG,.png"
            onClick={(e) => (e.target.value = null)}
            onChange={onFileChange}
          />
          <button
            type="button"
            className="button-primary px-5"
            onClick={() => photoRef.current.click()}
          >
            {selectedImage.filePreview ? "Ganti Gambar" : "Unggah Gambar"}
          </button>
        </div>
      )}
      {loading ? (
        ""
      ) : (
        <div className="w-full flex justify-end h-20 items-center gap-x-5">
          {errorMessage && submitClicked ? (
            <span className="text-red-600">{errorMessage}</span>
          ) : null}
          <div
            role="button"
            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
            onClick={() => setModalState(2)}
          >
            Kembali
          </div>
          <button
            type="button"
            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
            onClick={() => onSubmit3(selectedImage)}
          >
            Lanjutkan
          </button>
        </div>
      )}
    </div>
  );
}

export default AddImage;
