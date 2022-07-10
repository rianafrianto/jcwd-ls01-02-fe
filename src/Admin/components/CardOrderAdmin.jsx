import React, { useState } from "react";
import PrescriptionServiceModal from "./PrescriptionServiceModal";

function CardOrderAdmin() {
  const [checked, setChecked] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <PrescriptionServiceModal isOpen={isOpen} closeModal={closeModal} />
      <div className="w-full h-72 border flex flex-col bg-white rounded-lg overflow-hidden">
        <div
          className={`w-full h-14 flex justify-between items-center border-l-8 px-7 duration-300 ${
            checked ? "border-primary" : "border-white"
          }`}
        >
          <div className="flex gap-x-2">
            <input
              type="checkbox"
              name=""
              id=""
              onChange={() => setChecked(!checked)}
              className="checkbox checkbox-primary"
            />
            <span className="font-bold">Pesanan Baru</span>
            <span className="text-neutral-gray">/</span>
            <span className="font-bold">HTMED129X</span>
            <span className="text-neutral-gray">/</span>
            <span className="font-bold text-gray-500">10 jan 2022</span>
          </div>
          <div className="">Respon Sebelum</div>
        </div>
        <div className="border-b border-neutral-gray" />
        <div className="flex flex-col p-6 gap-y-3">
          <div className="flex h-20 border w-full">
            <div className="w-1/3">
              <button className="button-primary" onClick={openModal}>
                modal
              </button>
            </div>
            <div className="w-2/3">Pembeli</div>
          </div>
          <div className="flex justify-between items-center h-12 w-full px-5 font-bold">
            <div className="w-1/2">Total Harga</div>
            <div className="w-1/2 text-right">Price</div>
          </div>
          <div className="flex h-8 justify-between items-center">
            <div className="">Chat Pembeli</div>
            <div className="">Detail Pesanan</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardOrderAdmin;
