import React from "react";
import { useNavigate } from "react-router-dom";

function Dikirim({ data }) {
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
  } = data;

  return (
    <>
      <h1 className="h-6 w-full font-bold text-secondary text-2xl">
        Menunggu Konfirmasi
      </h1>
      <div className="w-full border h-28 flex justify-between rounded-lg p-5 bayangan">
        <div>
          <h3>Batas waktu Pembayaran</h3>
          <h2 className="h-6 w-full font-bold text-secondary text-xl">
            {`{waktu tenggat}`}
          </h2>
        </div>
        <div>Timer</div>
      </div>
      <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Ringkasan Order
        </h1>
        <div className="w-full h-full flex flex-col items-center gap-y-4 border-t border-neutral-gray ">
          {/* {loadingCart ? <Loading className="py-10" /> : printCartCard()} */}
        </div>
      </div>
      <div className="w-full h-72 flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Pembayaran
        </h1>
      </div>
      <div className="w-full h-72 flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Bukti Pembayaran
        </h1>
      </div>
      <div className="w-full h-14 flex gap-x-4 mb-10">
        <button
          className="h-full w-1/2 button-outline"
          onClick={() => navigate("/myaccount/orders?status=all")}
        >
          Cek Status Pembayaran Lainnya
        </button>
        <button
          className="h-full w-1/2 button-primary"
          onClick={() => setPaymentProofModal(true)}
        >
          Upload Bukti Pembayaran
        </button>
      </div>
      <div className="w-full border-t border-neutral-gray" />
      <div className="w-full h-full bg-white flex flex-col">
        <div className="h-20 w-full flex items-center">Cara Pembayaran</div>
        <div className="h-24 w-full border-b border-black flex items-center">
          ATM BCA
        </div>
        <div className="h-24 w-full border-b border-black flex items-center">
          ATM BCA
        </div>
        <div className="h-24 w-full border-b border-black flex items-center">
          ATM BCA
        </div>
        <div className="h-24 w-full border-b border-black flex items-center">
          ATM BCA
        </div>
      </div>
    </>
  );
}

export default Dikirim;
