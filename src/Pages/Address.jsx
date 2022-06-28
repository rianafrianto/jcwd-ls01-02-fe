import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Address() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  return (
    <div className="h-full w-screen bg-green-200 flex justify-center pt-20">
      <div className="container h-full flex flex-col px-96 py-24 gap-y-16">
        <div>Alamat Pengiriman</div>
        <div className="w-full  h-screen bg-white flex">Input Field</div>
        <div className="w-full h-14 flex gap-x-4">
          <button
            className="h-full w-1/2 border border-green-800 hover:bg-green-800 flex justify-center items-center"
            onClick={() => navigate(-1)}
          >
            Batalkan
          </button>
          <button
            className="h-full w-1/2 border border-green-800 hover:bg-green-800 flex justify-center items-center"
            onClick={() => navigate("/checkout")}
          >
            Simpan Alamat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Address;
