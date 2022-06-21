import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);
  let [tab, setTab] = useState(1);

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  return (
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
        <div className="w-full h-[550px] bg-white">
          {tab === 1 && <>Profile</>}

          {tab === 2 && <> Proses Pemesanan</>}

          {tab === 3 && <>Metode Pembayaran</>}
          {tab === 4 && <>Alamat Pengiriman</>}
          {tab === 5 && <>Favorite</>}
          {tab === 6 && <>Pesan Bantuan</>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
