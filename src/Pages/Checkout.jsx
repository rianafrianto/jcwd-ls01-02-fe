import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardCart from "../Component/CardCart";
import PaymentMethodModal from "../Component/PaymentMethodModal";

function Checkout() {
  const navigate = useNavigate();
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  // penambahan git
  return (
    <>
      {paymentMethodModal && (
        <PaymentMethodModal
          paymentMethodModal={paymentMethodModal}
          setPaymentMethodModal={setPaymentMethodModal}
        />
      )}
      <div className="h-full w-screen bg-green-200 flex justify-center pt-20">
        <div className="container h-full flex flex-col px-24 py-11">
          <div className="w-full border border-white flex gap-x-16">
            <div className="flex flex-col px-10 py-7 gap-y-7 w-4/6 bg-white">
              <div>
                <div className="h-6 w-full mb-3 border-b-[.5px] border-black">
                  Alamat Pengiriman
                </div>
                <div className="h-36 w-full flex justify-between">
                  <div className="border border-green-800 w-full">alamat</div>
                  <button className="mb-28 w-full px-1 border border-green-500 hover:bg-green-500">
                    Pilih alamat lain
                  </button>
                </div>
                <button
                  className="w-full h-6 border border-green-400 hover:bg-green-800"
                  onClick={() => navigate("/address")}
                >
                  Tambah alamat
                </button>
              </div>
              <div className="border border-black">
                <div className="h-6 w-full mb-3 border-b-[.5px] border-black">
                  Ringkasan Order
                </div>
                <CardCart />
              </div>
            </div>
            <div className="w-2/6 h-full border border-putih flex flex-col p-7 bg-green-400">
              <div className="h-full w-full bg-white flex flex-col gap-y-11">
                <div className="text-base mb-1">Total</div>
                <div className="text-base mb-5">Sub Total</div>
                <div className="text-base mb-3">Total</div>
                {/* <button
                  className="text-base border border-green-800 hover:bg-green-800"
                  onClick={() => {
                    setPaymentMethodModal(true);
                    console.log("modal open");
                  }}
                >
                  Metode Pembayaran
                </button> */}
                <label for="my-modal-4" class="btn modal-button">
                  Metode Pembayaran
                </label>
                <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                <label for="my-modal-4" class="modal cursor-pointer">
                  <label class="modal-box relative" for="">
                    <label
                      for="my-modal-4"
                      class="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <div className="h-4/6 border-black border">content</div>
                    <div className="h-1/6 border-black border flex justify-center items-center">
                      <button
                        className="btn btn-ghost border-primary hover:bg-primary"
                        onClick={() => navigate("/confirmation")}
                      >
                        pilih metode
                      </button>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
