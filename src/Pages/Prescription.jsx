import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
      <div className="h-full w-screen bg-green-200 flex justify-center items-center">
        <div className="container h-[500px] w-[400px] flex flex-col justify-between items-center bg-white py-10">
          BERHASIL!!!
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
    <div className="h-full w-screen bg-green-200 flex justify-center">
      <div className="container h-full flex flex-col px-52 py-14 gap-y-9">
        <div className="w-full bg-white flex flex-col gap-y-2">
          <div className="w-full h-7 flex items-center">kirim resep</div>
          <div className="w-full h-6 flex items-center">maximum 10MB</div>
        </div>
        <div className="w-full h-[550px] bg-white flex flex-col justify-end items-end px-16 py-7">
          <button
            className="h-20 w-40 border border-green-800 hover:bg-green-800"
            onClick={() => setUploadSuccess(true)}
          >
            unggah
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
