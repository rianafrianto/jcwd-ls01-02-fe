import React from "react";

function OrderCancel() {
  return (
    <div className="bg-red-500 h-full w-full flex">
      <div className="bg-green-400 w-full h-full pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="flex h-12 w-full mb-6">
            <div className="w-52 h-12 pt-3 text-center bg-green-500 border">
              Pesanan Dibatalkan
            </div>
          </div>
          <div className="flex justify-center w-ful mb-6">Baris</div>
          <div className="w-full">
            <div className="w-full h-[637px] bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCancel;
