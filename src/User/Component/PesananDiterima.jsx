import React from "react";
import { useNavigate } from "react-router-dom";
import { fullDateGenerator } from "../../Helpers/dateGenerator";
import CardCartCheckout from "./CardCartCheckout";
import Loading from "./Loading";
import Timer from "./Timer";

function PesananDiterima({ data }) {
  const navigate = useNavigate();
  let { transaction_code, expired_at } = data.dataOrder;
  const { cart } = data;

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
          <Timer time={expired_at} style="user" />
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
      <div className="w-full h-14 flex gap-x-4 mb-10">
        <button
          className="h-full w-1/2 button-outline"
          onClick={() => navigate("/myaccount/orders")}
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
