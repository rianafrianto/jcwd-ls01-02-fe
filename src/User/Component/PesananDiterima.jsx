import { ZoomInIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Helpers/API_URL";
import { fullDateGenerator } from "../../Helpers/dateGenerator";
import CardCartCheckout from "./CardCartCheckout";
import ModalZoomImage from "./ModalZoomImage";
import Timer from "./Timer";

function PesananDiterima({ data }) {
  const navigate = useNavigate();
  const [modalZoom, setModalZoom] = useState(false);
  let { transaction_code, expired_at, prescription_photo, date_requested } =
    data.dataOrder;
  const { cart } = data;

  const onCloseZoom = () => {
    setModalZoom(false);
  };
  const onOpenZoom = () => {
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

  return (
    <>
      <ModalZoomImage
        isOpen={modalZoom}
        closeModal={onCloseZoom}
        photo={prescription_photo}
      />
      <h1 className="h-6 w-full font-bold text-secondary text-2xl">
        Pesanan Diterima
      </h1>
      <div className="w-full border flex justify-between items-end rounded-lg p-5 bayangan">
        <div className="w-2/5 flex flex-col gap-y-3">
          <div>
            <h3 className="text-sm text-gray-500">Nomor Transaksi</h3>
            <h3 className="font-bold text-secondary">{transaction_code}</h3>
          </div>
          <h3 className="text-gray-500">Batas waktu respon</h3>
          <h2 className="w-full font-bold text-secondary text-xl">
            {fullDateGenerator(expired_at)}
          </h2>
        </div>
        <div className="h-full flex flex-col gap-y-3 items-end">
          <h3 className="text-sm text-gray-500">
            Mohon lanjutkan transaksi dalam jangka waktu
          </h3>
          <Timer time={expired_at} type="user" />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Ringkasan Order
        </h1>
        <div className="w-full h-full flex flex-col items-center gap-y-4 border-t border-neutral-gray ">
          {printCartCard()}
        </div>
      </div>
      {prescription_photo ? (
        <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
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
                onClick={() => {
                  onOpenZoom();
                }}
              >
                <ZoomInIcon className="h-5" />
                Perbesar Gambar
              </button>
            </div>
            <div className="h-full flex flex-col gap-y-1">
              <h3 className="text-sm text-gray-500 text-right">
                Tanggal Pengajuan
              </h3>
              <h3 className="font-bold text-secondary">
                {fullDateGenerator(date_requested)}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full h-14 flex gap-x-4 mb-10">
        <button
          className="h-full w-1/2 button-outline"
          onClick={() => navigate("/myaccount/orders?status=all")}
        >
          Cek Status Pembayaran Lainnya
        </button>
        <button
          className="h-full w-1/2 button-primary"
          onClick={() => navigate(`/checkout?id=${transaction_code}`)}
        >
          Lanjutkan Transaksi
        </button>
      </div>
    </>
  );
}

export default PesananDiterima;
