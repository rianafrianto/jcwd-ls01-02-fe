import { ClockIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import PrescriptionServiceModal from "./PrescriptionServiceModal";
import chatIcon from "../../Assets/chat-icon.png";
import transaksiActiveIcon from "../../Assets/transaksi-admin-active.png";
import API_URL from "../../Helpers/API_URL";

function CardOrderAdmin({ data }) {
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(data.status);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const printDate = (data) => {
    let date = new Date(`${data} UTC`).toString().split(" ");
    return `${date[0]}, ${date[1]} ${date[2]} ${date[3]}, ${date[4]}`;
  };

  return (
    <>
      <PrescriptionServiceModal
        isOpen={isOpen}
        closeModal={closeModal}
        data={data}
      />
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
              value={data}
            />
            <span className="font-bold">{status.split("-").join(" ")}</span>
            <span className="text-neutral-gray">/</span>
            <span className="font-bold">{data.transaction_code}</span>
            <span className="text-neutral-gray">/</span>
            <span className="font-bold text-gray-500 flex gap-x-2 items-center">
              <ClockIcon className="h-5 aspect-square" />
              {printDate(data.date_process)}
            </span>
          </div>
          <div className="flex gap-x-2">
            {(status == "Pengecekan-Resep" || "Diproses") && (
              <>
                <span className="font-bold">Respon Sebelum</span>
                <div className="bg-yellow-200 rounded flex gap-x-2 items-center font-semibold text-red-600 text-xs px-2">
                  <ClockIcon className="h-4 aspect-square" />
                  {`{date_process + 2day}`}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="border-b border-neutral-gray" />
        <div className="flex flex-col p-6 gap-y-3">
          <div className="flex h-20 w-full gap-x-8">
            <div className="w-1/3 flex gap-x-6">
              <div className="h-full aspect-square border rounded object-cover overflow-hidden">
                <img
                  src={
                    data.transaction_code.split()[1] === "L"
                      ? ""
                      : API_URL + data.prescription_photo
                  }
                  alt="photo"
                />
              </div>
              <div className="w-full h-full">
                {data.transaction_code.split()[1] === "L"
                  ? ""
                  : "Lakukan Pengecekan Resep"}
              </div>
            </div>
            <div className="border-r h-full" />
            <div className="w-2/3 flex gap-x-8">
              <div className="w-1/3 flex flex-col">
                <h3 className="font-bold">Pembeli</h3>
                <p>{data.username}</p>
              </div>
              {status != "Pengecekan-Resep" && (
                <>
                  <div className="w-1/3 border">Alamat</div>
                  <div className="w-1/3 border">Kurir</div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center h-12 w-full px-5 font-bold">
            {status != "Pengecekan-Resep" && (
              <>
                <div className="w-1/2">Total Harga</div>
                <div className="w-1/2 text-right">Price</div>
              </>
            )}
          </div>
          <div className="flex h-8 justify-between items-center">
            <div className="h-full flex gap-x-5">
              <button className="button-outline rounded-full flex gap-x-2 text-sm px-5">
                <img src={chatIcon} alt="" className="h-full scale-125" />
                <span>Chat Pembeli</span>
              </button>
              {status != "Pengecekan-Resep" && (
                <button className="button-outline rounded-full flex gap-x-2 text-sm px-5">
                  <img src={transaksiActiveIcon} alt="" className="h-full" />
                  <span>Detail Pemesanan</span>
                </button>
              )}
            </div>
            <div className="h-full flex gap-x-5 w-1/3">
              {(status == "Pengecekan-Resep" || "Diproses") && (
                <>
                  <button className="button-outline w-1/2" onClick={() => {}}>
                    Tolak Pesanan
                  </button>
                  {status == "Pengecekan-Resep" && (
                    <button
                      className="button-primary w-1/2"
                      onClick={openModal}
                    >
                      Buat Salinan Resep
                    </button>
                  )}
                  {status == "Diproses" && (
                    <button className="button-primary w-1/2" onClick={() => {}}>
                      Terima Pesanan
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardOrderAdmin;
