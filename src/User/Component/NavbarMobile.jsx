import React from "react";
import homeIcon from "../../Assets/home-admin.png";
import homeActiveIcon from "../../Assets/home-admin-active.png";
import produkIcon from "../../Assets/produk-admin.png";
import produkActiveIcon from "../../Assets/produk-admin-active.png";
import transaksiIcon from "../../Assets/transaksi-admin.png";
import transaksiActiveIcon from "../../Assets/transaksi-admin-active.png";
import profileIcon from "../../Assets/profile-mobile.png";
import bantuanIcon from "../../Assets/bantuan-mobile.png";
import profileActiveIcon from "../../Assets/profile-nav-icon.png";
import { MdHeadsetMic } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
function NavbarMobile() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="w-full h-20 sm:hidden fixed bottom-0 z-40 grid grid-cols-5 bg-white  overflow-hidden">
      <button
        className="btn-plain flex flex-col justify-center items-center gap-y-1"
        onClick={() => navigate("/")}
      >
        <img
          src={location.pathname === "/" ? homeActiveIcon : homeIcon}
          alt=""
          className="h-7 aspect-square"
        />
        <span
          className={`text-xs font-semibold ${
            location.pathname === "/" ? "text-primary" : "text-neutral-gray"
          }`}
        >
          Beranda
        </span>
      </button>
      <button
        className="btn-plain flex flex-col justify-center items-center gap-y-1"
        onClick={() => navigate("/category/all")}
      >
        <img
          src={
            location.pathname.match("/category") ? produkActiveIcon : produkIcon
          }
          alt=""
          className="h-7 aspect-square"
        />
        <span
          className={`text-xs font-semibold ${
            location.pathname.match("/category")
              ? "text-primary"
              : "text-neutral-gray"
          }`}
        >
          Produk
        </span>
      </button>
      <button
        className="btn-plain flex flex-col justify-center items-center gap-y-1"
        onClick={() => navigate("/myaccount/orders")}
      >
        <img
          src={
            location.pathname === "/myaccount/orders"
              ? transaksiActiveIcon
              : transaksiIcon
          }
          alt=""
          className="h-7 aspect-square"
        />
        <span
          className={`text-xs font-semibold ${
            location.pathname === "/myaccount/orders"
              ? "text-primary"
              : "text-neutral-gray"
          }`}
        >
          Transaksi
        </span>
      </button>
      <button
        className="btn-plain flex flex-col justify-center items-center gap-y-1"
        onClick={() => {}}
      >
        <img src={bantuanIcon} alt="" className="h-7 aspect-square" />
        <span className={`text-xs font-semibold text-neutral-gray`}>
          Bantuan
        </span>
      </button>
      <button
        className="btn-plain flex flex-col justify-center items-center gap-y-1"
        onClick={() => navigate("/myaccount/profile")}
      >
        <img
          src={
            location.pathname === "/myaccount/profile"
              ? profileActiveIcon
              : profileIcon
          }
          alt=""
          className="h-7 aspect-square"
        />
        <span
          className={`text-xs font-semibold ${
            location.pathname === "/myaccount/profile"
              ? "text-primary"
              : "text-neutral-gray"
          }`}
        >
          Profile
        </span>
      </button>
    </div>
  );
}

export default NavbarMobile;
