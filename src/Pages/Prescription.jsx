import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import succesImage from "../Assets/success-image.png";
import Button from "../Component/Button";

function Prescription() {
  const navigate = useNavigate();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { isLogin } = useSelector((state) => state.user);

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
    <div className="h-full w-screen bg-white flex justify-center">
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
            <div className="w-full h-[400px] rounded-xl px-6 border bg-cyan-50 border-grey mt-5">
              <div className="flex justify-center mt-20 text-xl">
                Tarik & Letakan File
              </div>
              <div className="w-full min-h-min flex flex-col gap-y-5 mt-10">
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
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="mr-6 mt-5 h-10 w-20 border border-green-800 hover:bg-green-800"
                onClick={() => setUploadSuccess(false)}
              >
                Cancel
              </button>
              <button
                className=" mt-5 h-10 w-20 border border-green-800 hover:bg-green-800"
                onClick={() => setUploadSuccess(true)}
              >
                Submit
              </button>
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
    </div>
  );
}

export default Prescription;
