import { ChevronDownIcon, ZoomInIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Helpers/API_URL";
import { fullDateGenerator } from "../../Helpers/dateGenerator";
import CardCartCheckout from "./CardCartCheckout";
import ModalZoomImage from "./ModalZoomImage";
import Timer from "./Timer";

function MenungguPembayaran({ data }) {
  const navigate = useNavigate();
  let {
    id,
    status,
    selected_address,
    payment_method,
    total_price,
    date_requested,
    date_process,
    prescription_photo,
    payment_photo,
    shipping_method,
    transaction_code,
    pesan,
    expired_at,
  } = data.dataOrder;
  const { cart } = data;
  const [modalZoom, setModalZoom] = useState(false);
  const onClose = () => {
    setModalZoom(false);
  };
  const onOpen = () => {
    setModalZoom(true);
  };

  const printCartCard = () => {
    return cart.map((val, i) => {
      return (
        <div key={i} className="w-full">
          <CardCartCheckout data={val} />
          <div className="w-full border-t border-neutral-gray" />
        </div>
      );
    });
  };

  const [disclosure1, setDisclosure1] = useState(false);
  const [disclosure2, setDisclosure2] = useState(false);
  const [disclosure3, setDisclosure3] = useState(false);

  return (
    <>
      <ModalZoomImage
        isOpen={modalZoom}
        closeModal={onClose}
        photo={prescription_photo}
      />
      <h1 className="h-6 w-full font-bold text-secondary text-2xl">
        Menunggu Pembayaran
      </h1>
      <div className="w-full border flex justify-between rounded-lg p-5 bayangan">
        <div className="w-2/5 flex flex-col gap-y-3">
          <h3 className="text-gray-500">Batas Akhir Pembayaran</h3>
          <h2 className="w-full font-bold text-secondary text-xl">
            {fullDateGenerator(expired_at)}
          </h2>
        </div>
        <div className="h-full flex flex-col gap-y-3 items-end">
          <h3 className="text-sm text-gray-500">
            Mohon melakukan pembayaran dalam jangka waktu
          </h3>
          <Timer time={expired_at} style="user" />
        </div>
      </div>
      {prescription_photo ? (
        <div className="w-full flex flex-col items-start justify-between rounded-lg px-10 py-7 bayangan border">
          <h1 className="h-6 w-full font-bold text-secondary text-xl">
            Detail Resep
          </h1>
          <div className="w-full flex h-36 gap-x-5">
            <figure className="aspect-square h-full border rounded-lg overflow-hidden">
              <img src={API_URL + prescription_photo} alt="" />
            </figure>
            <div className="flex-grow h-full flex flex-col justify-between items-start">
              <div className="flex flex-col gap-y-1">
                <h3 className="text-sm text-gray-500">Nomor Transaksi</h3>
                <h3 className="font-bold text-secondary">{transaction_code}</h3>
              </div>
              <button
                className="btn-plain text-primary font-semibold flex items-center gap-x-2"
                onClick={onOpen}
              >
                <ZoomInIcon className="h-5" />
                Perbesar Gambar
              </button>
            </div>
            <div className="h-full flex flex-col gap-y-1">
              <h3 className="text-sm text-gray-500">Tanggal Pengajuan</h3>
              <h3 className="font-bold text-secondary">
                {fullDateGenerator(date_requested)}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Ringkasan Order
        </h1>
        <div className="w-full h-full flex flex-col items-center gap-y-4 border-t border-neutral-gray ">
          {printCartCard()}
        </div>
      </div>
      <div className="w-full h-72 flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Pembayaran
        </h1>
      </div>

      <div className="w-full h-14 flex gap-x-4 mb-10">
        <button
          className="h-full w-1/2 button-outline"
          onClick={() => navigate("/myaccount")}
        >
          Cek Status Pembayaran
        </button>
        <button className="h-full w-1/2 button-primary" onClick={() => {}}>
          Upload Bukti Pembayaran
        </button>
      </div>
      <div className="w-full border-t border-neutral-gray" />
      <div className="w-full h-full bg-white flex flex-col">
        <h1 className="h-6 w-full font-bold text-secondary text-xl mb-5">
          Cara Pembayaran
        </h1>
        <div
          className={`w-full relative duration-300 border-b border-neutral-gray ${
            disclosure1 ? "h-[465px]" : "h-20"
          }`}
        >
          <button
            className={`button-left-bar justify-between z-20 px-4 border-y border-neutral-gray ${
              true ? "text-primary" : ""
            }`}
            onClick={() => {
              setDisclosure1(!disclosure1);
              setDisclosure2(false);
              setDisclosure3(false);
            }}
          >
            <div className="flex w-full gap-x z-20 justify-start items-center gap-x-2">
              ATM BCA
            </div>
            <ChevronDownIcon
              className={`h-5 duration-300 ${disclosure1 ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`w-full flex flex-col absolute duration-300 pointer-events-auto ${
              disclosure1 ? "z-0" : "-translate-y-full -z-10"
            }`}
          >
            <div className={` ${true ? "text-primary" : ""}`}>Semua</div>
          </div>
        </div>
        <div
          className={`w-full relative duration-300 border-b border-neutral-gray ${
            disclosure2 ? "h-[465px]" : "h-20"
          }`}
        >
          <button
            className={`button-left-bar justify-between z-20 px-4 border-b border-neutral-gray ${
              true ? "text-primary" : ""
            }`}
            onClick={() => {
              setDisclosure2(!disclosure2);
              setDisclosure3(false);
              setDisclosure1(false);
            }}
          >
            <div className="flex w-full gap-x z-20 justify-start items-center gap-x-2">
              m-BCA (BCA Mobile)
            </div>
            <ChevronDownIcon
              className={`h-5 duration-300 ${disclosure2 ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`w-full flex flex-col absolute duration-300 pointer-events-auto ${
              disclosure2 ? "z-0" : "-translate-y-full -z-10"
            }`}
          >
            <div className={` ${true ? "text-primary" : ""}`}>Semua</div>
          </div>
        </div>
        <div
          className={`w-full relative duration-300 border-b border-neutral-gray ${
            disclosure3 ? "h-[465px]" : "h-20"
          }`}
        >
          <button
            className={`button-left-bar justify-between z-20 px-4 border-b border-neutral-gray ${
              true ? "text-primary" : ""
            }`}
            onClick={() => {
              setDisclosure3(!disclosure3);
              setDisclosure2(false);
              setDisclosure1(false);
            }}
          >
            <div className="flex w-full gap-x z-20 justify-start items-center gap-x-2">
              Internet Banking BCA
            </div>
            <ChevronDownIcon
              className={`h-5 duration-300 ${disclosure3 ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`w-full flex flex-col absolute duration-300 pointer-events-auto ${
              disclosure3 ? "z-0" : "-translate-y-full -z-10"
            }`}
          >
            <div className={` ${true ? "text-primary" : ""}`}>Semua</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenungguPembayaran;
