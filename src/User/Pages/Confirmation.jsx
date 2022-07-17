import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardCart from "../Component/CardCart";
import PaymentProofModal from "../Component/PaymentProofModal";

function Confirmation() {
  const navigate = useNavigate();
  const [paymentProofModal, setPaymentProofModal] = useState(false);
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  return (
    <>
      {paymentProofModal && (
        <PaymentProofModal
          paymentProofModal={paymentProofModal}
          setPaymentProofModal={setPaymentProofModal}
        />
      )}
      <div className="h-full w-screen bg-green-200 flex justify-center pt-20">
        <div className="container h-full flex flex-col px-80 py-16 gap-y-10">
          <div>Menunggu Pembayaran</div>
          <div className="w-full h-28 bg-white px-10">Batas waktu</div>
          <div className="w-full h-full bg-white flex flex-col px-10 justify-center">
            Ringkasan Order
            <CardCart />
          </div>
          <div className="w-full h-72 bg-white flex px-10 py-8">Pembayaran</div>
          <button className="w-full h-72 bg-white flex px-10 py-8">
            Bukti Pembayaran
          </button>
          <div className="w-full h-14 flex gap-x-4 mb-10">
            <button
              className="h-full w-1/2 border border-green-800 hover:bg-green-800 flex justify-center items-center"
              onClick={() => navigate("/myaccount")}
            >
              Cek Status Pembayaran
            </button>
            <button
              className="h-full w-1/2 border border-green-800 hover:bg-green-800 flex justify-center items-center"
              onClick={() => setPaymentProofModal(true)}
            >
              Upload Bukti Pembayaran
            </button>
          </div>
          <div className="w-full border-[.5px] border-black" />
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
        </div>
      </div>
    </>
  );
}

export default Confirmation;
