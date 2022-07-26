import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../../Assets/home-admin.png";
import homeActiveIcon from "../../Assets/home-admin-active.png";
import produkIcon from "../../Assets/produk-admin.png";
import produkActiveIcon from "../../Assets/produk-admin-active.png";
import transaksiIcon from "../../Assets/transaksi-admin.png";
import transaksiActiveIcon from "../../Assets/transaksi-admin-active.png";
import salesIcon from "../../Assets/sales-admin.png";
import salesActiveIcon from "../../Assets/sales-admin-active.png";
import { ChevronDownIcon } from "@heroicons/react/outline";
import logo from "../../Assets/logo.png";

function Leftbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transaksiDisclosure, setTransaksiDisclosure] = useState(false);
  const [salesDisclosure, setSalesDisclosure] = useState(false);
  return (
    <div className="h-full flex flex-col w-64 fixed top-0 z-50 bg-white overflow-hidden shadow-custom-lg">
      <div className="w-full h-16 flex justify-center items-center bg-white z-10 p-10">
        <img src={logo} alt="logo" className="w-full" />
      </div>
      <Link
        to="/admin/dashboard"
        className={`button-left-bar pl-4 z-10 ${
          location.pathname === "/admin/dashboard" ? "text-primary" : ""
        }`}
      >
        <div className="flex w-full gap-x justify-start items-center gap-x-2">
          <img
            src={
              location.pathname === "/admin/dashboard"
                ? homeActiveIcon
                : homeIcon
            }
            alt=""
            className="h-5"
          />{" "}
          Dashboard
        </div>
      </Link>
      <Link
        to="/admin/products"
        className={`button-left-bar pl-4 z-10 ${
          location.pathname === "/admin/products" ? "text-primary" : ""
        }`}
      >
        <div className="flex w-full gap-x justify-start items-center gap-x-2">
          <img
            src={
              location.pathname === "/admin/products"
                ? produkActiveIcon
                : produkIcon
            }
            alt=""
            className="h-5"
          />{" "}
          Produk
        </div>
      </Link>
      <div
        className={`w-full relative duration-300 ${
          transaksiDisclosure ? "h-[465px]" : "h-20"
        }`}
      >
        <button
          className={`button-left-bar justify-between z-20 px-4 ${
            location.pathname.match("/admin/orders") ? "text-primary" : ""
          }`}
          onClick={() => {
            setTransaksiDisclosure(!transaksiDisclosure);
          }}
        >
          <div className="flex w-full gap-x z-20 justify-start items-center gap-x-2">
            <img
              src={
                location.pathname.match("/admin/orders")
                  ? transaksiActiveIcon
                  : transaksiIcon
              }
              alt=""
              className="h-5"
            />{" "}
            Transaksi
          </div>
          <ChevronDownIcon
            className={`h-5 duration-300 ${
              transaksiDisclosure ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`w-full flex flex-col absolute duration-300 pointer-events-auto ${
            transaksiDisclosure ? "z-0" : "-translate-y-full -z-10"
          }`}
        >
          <Link
            to="/admin/orders/all"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/orders/all" ? "text-primary" : ""
            }`}
          >
            Semua
          </Link>
          <Link
            to="/admin/orders/pengecekan_resep"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/orders/pengecekan_resep"
                ? "text-primary"
                : ""
            }`}
          >
            Pengecekan Resep
          </Link>
          <Link
            to="/admin/orders/pesanan_diterima"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/orders/pesanan_diterima"
                ? "text-primary"
                : ""
            }`}
          >
            Pesanan Diterima
          </Link>
          <Link
            to="/admin/orders/menunggu_pembayaran"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/orders/menunggu_pembayaran"
                ? "text-primary"
                : ""
            }`}
          >
            Menunggu Pembayaran
          </Link>
          <Link
            to="/admin/orders/diproses"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/orders/diproses"
                ? "text-primary"
                : ""
            }`}
          >
            Diproses
          </Link>
          <Link
            to="/admin/orders/dikirim"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/orders/dikirim"
                ? "text-primary"
                : ""
            }`}
          >
            Dikirim
          </Link>
          <Link
            to="/admin/orders/selesai"
            className={`sub-button-left-bar pointer-events-auto ${
              location.pathname === "/admin/orders/selesai"
                ? "text-primary"
                : ""
            }`}
          >
            Selesai
          </Link>
          <button
            onClick={() => navigate("/admin/orders/dibatalkan")}
            className={`sub-button-left-bar ${
              location.pathname === "/admin/orders/dibatalkan"
                ? "text-primary"
                : ""
            }`}
          >
            Dibatalkan
          </button>
        </div>
      </div>
      <div
        className={`w-full relative duration-300 ${
          salesDisclosure ? "h-[224px]" : "h-20"
        }`}
      >
        <button
          className={`button-left-bar justify-between px-4 ${
            location.pathname === "/admin/sales" ||
            location.pathname === "/admin/statistics" ||
            location.pathname === "/admin/report"
              ? "text-primary"
              : ""
          }`}
          onClick={() => {
            setSalesDisclosure(!salesDisclosure);
          }}
        >
          <div className="flex w-full gap-x justify-start items-center gap-x-2">
            <img
              src={
                location.pathname === "/admin/sales" ||
                location.pathname === "/admin/statistics" ||
                location.pathname === "/admin/report"
                  ? salesActiveIcon
                  : salesIcon
              }
              alt=""
              className="h-5"
            />{" "}
            Sales & Revenue
          </div>

          <ChevronDownIcon
            className={`h-5 duration-300 ${
              salesDisclosure ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`w-full flex flex-col absolute duration-300 pointer-events-auto ${
            salesDisclosure ? "z-0" : "-translate-y-full -z-10"
          }`}
        >
          <Link
            to="/admin/statistics"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/statistics" ? "text-primary" : ""
            }`}
          >
            Ringkasan Statistik
          </Link>
          <Link
            to="/admin/report"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/report" ? "text-primary" : ""
            }`}
          >
            Buku Kas{" "}
          </Link>
          <Link
            to="/admin/sales"
            className={`sub-button-left-bar ${
              location.pathname === "/admin/sales" ? "text-primary" : ""
            }`}
          >
            Laba dan Rugi{" "}
          </Link>
        </div>
      </div>

      <div className="flex-grow bg-white z-10" />
    </div>
  );
}

export default Leftbar;
