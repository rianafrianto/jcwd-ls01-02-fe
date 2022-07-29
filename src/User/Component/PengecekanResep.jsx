import { ZoomInIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zoom } from "react-toastify";
import chatIcon from "../../Assets/chat-icon.png";
import API_URL from "../../Helpers/API_URL";
import { fullDateGenerator } from "../../Helpers/dateGenerator";
import ModalZoomImage from "./ModalZoomImage";
import Timer from "./Timer";

function PengecekanResep({ data }) {
  const navigate = useNavigate();
  const [modalZoom, setModalZoom] = useState(false);

  let { date_requested, prescription_photo, transaction_code, expired_at } =
    data?.dataOrder;

  const onClose = () => {
    setModalZoom(false);
  };
  const onOpen = () => {
    setModalZoom(true);
  };

  return (
    <>
      <ModalZoomImage
        isOpen={modalZoom}
        closeModal={onClose}
        photo={prescription_photo}
      />
      <h1 className="h-6 w-full font-bold text-secondary text-2xl">
        Menunggu Konfirmasi
      </h1>
      <div className="w-full h-80 flex flex-col items-start justify-between rounded-lg px-10 py-7 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Detail Resep
        </h1>
        <div className="w-full flex h-36 gap-x-5">
          <figure className="aspect-square h-full border rounded-lg overflow-hidden">
            <img src={API_URL + prescription_photo} alt="" />
          </figure>
          <div className="flex-grow h-full flex flex-col justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-500">Nomor Transaksi</h3>
              <h3 className="font-bold text-secondary">{transaction_code}</h3>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Tanggal Pengajuan</h3>
              <h3 className="font-bold text-secondary">
                {fullDateGenerator(date_requested)}
              </h3>
            </div>
            <button
              className="btn-plain text-primary font-semibold flex items-center gap-x-2"
              onClick={onOpen}
            >
              <ZoomInIcon className="h-5" />
              Perbesar Gambar
            </button>
          </div>
          <div className="h-full flex flex-col gap-y-3 items-end">
            <h3 className="text-sm text-gray-500 ">
              Mohon menunggu balasan dari apoteker max 1 hari
            </h3>
            <div>
              <Timer time={expired_at} type="admin" />
            </div>
          </div>
        </div>
        <div className="h-6 w-full flex justify-end gap-x-5">
          <div className="flex items-center">
            <button className="px-5 btn-plain font-bold text-primary">
              Batalkan Pengajuan
            </button>
            <div className="h-2/3 border-x border-neutral-gray" />
            <button className="px-5 btn-plain font-bold text-primary flex gap-x-2 items-center">
              <img src={chatIcon} alt="" className="h-8" /> Chat Customer
              Service
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-14 flex gap-x-4 mb-10">
        <button
          className="h-full w-1/2 button-outline"
          onClick={() => navigate("/")}
        >
          Kembali Ke Beranda
        </button>
        <button
          className="h-full w-1/2 button-primary"
          onClick={() => navigate("/myaccount/orders?status=all")}
        >
          Cek Status Pembayaran Lainnya
        </button>
      </div>
    </>
  );
}

export default PengecekanResep;
