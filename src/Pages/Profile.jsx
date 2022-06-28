import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();

  const { id, username, email } = useSelector((state) => state.user);
  const { isLogin } = useSelector((state) => state.user);
  let [tab, setTab] = useState(1);
  const [loadingEmail, setLoadingEmail] = useState(false);

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

  const tabPrint = (tab) => {
    switch (tab) {
      case "PROFIL":
        return (
          <div className="w-full h-full flex flex-col items-center gap-y-5">
            Profile
            <button
              disabled={loadingEmail}
              className="border border-1 border-green-600 hover:bg-green-600 disabled:bg-gray-500"
              onClick={sendEmail}
            >
              Send Email Verification
            </button>
          </div>
        );
      case "PROSES":
        return <> Proses Pemesanan</>;
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
    <div className="h-full w-full bg-green-200 flex justify-center pt-20">
      <div className="container h-full flex px-24 py-14 gap-x-11">
        <div className="w-80 bg-white flex flex-col px-10">
          <div className="w-full h-20 flex items-center">{username}</div>
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
  );
}

export default Profile;
