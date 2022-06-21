import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  return (
    <div className="h-full w-full bg-green-200 flex justify-center">
      <div className="container h-full flex px-24 py-14 gap-x-11">
        <div className="w-80 bg-white flex flex-col px-10">
          <div className="w-full h-20 flex items-center">Jane Doe</div>
          <div className="w-full h-20 flex items-center">Profil</div>
          <div className="w-full h-20 flex items-center">Proses Pemesanan</div>
          <div className="w-full h-20 flex items-center">Metode Pembayaran</div>
          <div className="w-full h-20 flex items-center">Alamat Pengiriman</div>
          <div className="w-full h-20 flex items-center">Favorite</div>
          <div className="w-full h-20 flex items-center">Pesan Bantuan</div>
        </div>
        <div className="w-full h-[550px] bg-white">Daftar Pesanan</div>
      </div>
    </div>
  );
}

export default Profile;
