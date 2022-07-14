import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Component/Card";
import CardCart from "../Component/CardCart";

function Cart() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  return (
    <div className="h-full w-screen bg-green-200 flex justify-center pt-20">
      <div className="container h-full flex flex-col px-24 py-11">
        Keranjang Saya
        <div className="w-full mt-9 border border-white flex gap-x-16">
          <div className="flex flex-col px-10 w-4/6 bg-white">
            <div className="h-20 w-full border-b-[.5px] border-black">
              Pilih Semua check box
            </div>
            <CardCart />
          </div>
          <div className="w-2/6 h-full border border-putih flex flex-col p-7 bg-green-400">
            <div className="h-full w-full bg-white flex flex-col gap-y-11">
              <div className="text-base mb-1">Total</div>
              <div className="text-base mb-5">Sub Total</div>
              <div className="text-base mb-3">Total</div>
              <button
                className="text-base border border-green-800 hover:bg-green-800"
                onClick={() => navigate("/checkout")}
              >
                bayar
              </button>
            </div>
          </div>
        </div>
        <div className="w-full border-t-[.5px] border-blackh-20 bg-white flex py-28 mt-28 relative">
          <div className="absolute left-3 top-10 text-2xl">
            Lorem, ipsum dolor.
          </div>
          {/* <Card /> */}
        </div>
      </div>
    </div>
  );
}

export default Cart;
